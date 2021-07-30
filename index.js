var PROTO_PATH = __dirname + '/protos/test.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        Timestamp: String,
        defaults: true,
        oneofs: true
    });
var pkg_proto = grpc.loadPackageDefinition(packageDefinition).test;
var port = process.env.port || 50000
function main() {
    var target = `localhost:${port}`;
    var client = new pkg_proto.Test(target, grpc.credentials.createInsecure());
    get(client);
}

function getAll(client) {
    var getAllParam = { limit: 4, page: 1 };
    client.GetAll(getAllParam, function (err, response) {
        console.log('all:', response);
    });
}

function get(client) {
    client.Get({ id: 'any' }, function (err, response) {
        console.log('one:', response);
    });
}

main();