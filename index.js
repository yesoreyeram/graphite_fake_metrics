var _ = require("lodash");
const config = {
    server_types: ["web", "app", "db"],
    number_of_servers: 3,
    application_type: ["orders", "payments", "customercare", "backoffice"],
    application_metrics: "active_user_count,profit,expenses"
}
var main = function () {
    var metrics = {};
    _.each(config.server_types, (server_type) => {
        _.each(_.range(config.number_of_servers), (server_id) => {
            _.set(metrics, "server_stats." + server_type + "_" + server_id + ".cpu.usage", Math.round(Math.random() * 100), Object);
            _.set(metrics, "server_stats." + server_type + "_" + server_id + ".mem.usage", Math.round(Math.random() * 100), Object);
            _.set(metrics, "server_stats." + server_type + "_" + server_id + ".disk.c.freespace", Math.ceil(Math.random() * 100) * 1024 * 1024, Object);
            _.set(metrics, "server_stats." + server_type + "_" + server_id + ".disk.d.freespace", Math.ceil(Math.random() * 100) * 1024 * 1024, Object);
            _.set(metrics, "server_stats." + server_type + "_" + server_id + ".disk.e.freespace", Math.ceil(Math.random() * 100) * 1024 * 1024, Object);
        });
    })
    _.each(config.application_type, (app_type) => {
        _.set(metrics, "app_stats." + app_type + ".requests_per_second", Math.random() * 100, Object);
        _.set(metrics, "app_stats." + app_type + ".requests_passed", Math.round(Math.random() * 100), Object);
        _.set(metrics, "app_stats." + app_type + ".requests_failed", Math.round(Math.random() * 100), Object);
        _.each((config.application_metrics).split(","), (metric) => {
            _.set(metrics, "app_stats." + app_type + ".stat." + metric, Math.round(Math.random() * 100), Object);
        });
    })
    console.log(JSON.stringify(metrics));
}
main();