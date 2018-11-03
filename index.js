var _ = require("lodash");
var Graphite = require('./graphite');
const INTERVAL_IN_SECONDS = 60;
const GRAPHITE_URL = "localhost";
const GRAPHITE_PORT = 2003;
const config = {
    environments: ["prod", "preprod", "test", "dev"],
    server_types: ["web", "app", "db"],
    number_of_servers: 3,
    application_type: ["orders", "payments", "customercare", "backoffice"],
    application_metrics: "active_user_count,profit,expenses"
}
var main = function () {
    try {
        var metrics = {};
        _.each(config.environments, (env) => {
            _.each(config.server_types, (server_type) => {
                _.each(_.range(config.number_of_servers), (server_id) => {
                    _.set(metrics, env + ".server_stats." + server_type + "_" + server_id + ".cpu.usage", Math.round(Math.random() * 100), Object);
                    _.set(metrics, env + ".server_stats." + server_type + "_" + server_id + ".mem.usage", Math.round(Math.random() * 100), Object);
                    _.set(metrics, env + ".server_stats." + server_type + "_" + server_id + ".disk.c.freespace", Math.ceil(Math.random() * 100) * 1024 * 1024, Object);
                    _.set(metrics, env + ".server_stats." + server_type + "_" + server_id + ".disk.d.freespace", Math.ceil(Math.random() * 100) * 1024 * 1024, Object);
                    _.set(metrics, env + ".server_stats." + server_type + "_" + server_id + ".disk.e.freespace", Math.ceil(Math.random() * 100) * 1024 * 1024, Object);
                    _.set(metrics, env + ".server_stats." + server_type + "_" + server_id + ".always_zero_value", 0, Object);
                    _.set(metrics, env + ".server_stats." + server_type + "_" + server_id + ".metric_with_null", _.random([100, null, null, 200]), Object);
                });
            })
            _.each(config.application_type, (app_type) => {
                _.set(metrics, env + ".app_stats." + app_type + ".requests_per_second", Math.random() * 100, Object);
                _.set(metrics, env + ".app_stats." + app_type + ".requests_passed", Math.round(Math.random() * 100), Object);
                _.set(metrics, env + ".app_stats." + app_type + ".requests_failed", Math.round(Math.random() * 100), Object);
                _.each((config.application_metrics).split(","), (metric) => {
                    _.set(metrics, env + ".app_stats." + app_type + ".stat." + metric, Math.round(Math.random() * 100), Object);
                });
            })
        })
        var graphite = new Graphite(GRAPHITE_URL, GRAPHITE_PORT, 'UTF-8');
        graphite.connect(function () {
            graphite.write(metrics, Date.now(), function (err) {});
        });
    } catch (error) {
        console.log(error);
    }
}
main();
setInterval(function () {
    main()
}, INTERVAL_IN_SECONDS * 1000)