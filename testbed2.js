var descriptors;
var tDCSService = '0000aab0-f845-40fa-995d-658a43feea4c';
var characteristics = {
    'command' : '0000aab1-f845-40fa-995d-658a43feea4c',
    'response' : '0000aab2-f845-40fa-995d-658a43feea4c',
    'buffer' : '0000aab3-f845-40fa-995d-658a43feea4c',
    'actual_current' : '0000aab4-f845-40fa-995d-658a43feea4c',
    'remaining_time' : '0000aab6-f845-40fa-995d-658a43feea4c'
}
var getResponse = '00002902-0000-1000-8000-00805f9b34fb';

async function onReadButtonClick() {
    try {
        console.log('Pairing');
        const device = await navigator.bluetooth.requestDevice(
            {
                filters: [
                    {
                        name: 'foc.us v3'
                    }
                ],
                optionalServices: [tDCSService]
            }
        )

        console.log('Connecting to GATT server');
        const server = await device.gatt.connect();

        console.log('Getting service');
        const service = await server.getPrimaryService(tDCSService);

        console.log('Getting characteristic');
        const command = await service.
                              getCharacteristic(characteristics['command']);

        // console.log('Getting descriptor');
        // descriptors = await characteristic.getDescriptors();

        // console.log('Reading characteristic');
        // const value = await characteristic.readValue();

        // let decoder = new TextDecoder('utf-8');
        // console.log('> Characteristic description: ' + decoder.decode(value));

        // console.log('> Descriptors: ' +
        // descriptors.map(c => c.uuid).join('\n' + ' '.repeat(19)));

        // let encoder = new TextEncoder('utf-8');

        console.log('Get maximum number of programs');
        var readPg = new Int8Array([2, 3, 3, 0, 0, 0]);
        await command.writeValue(readPg);
        // console.log('Encoded command: ' + encoder.encode('230000'));
        
        console.log('Get data');
        const data = await service.getCharacteristic(characteristics['buffer'])
        console.log(data);
        console.log('Read data');
        const value = await data.readValue();
        // const value = await desc.readValue();

        // let decoder = new TextDecoder('utf-8');
        const view = new Int8Array(value.buffer);
        console.log('> Description: ' + view);

    } catch(error) {
        console.log('Argh! ' + error);
    }
}

var form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', 
    function(event) {
        event.stopPropagation();
        event.preventDefault();
        onReadButtonClick();
    })
} else {console.log('Duma!!!!')}