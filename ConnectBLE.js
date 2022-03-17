import { tDCSService } from './Constants.js';

export default async function connectBLE() {
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

        return service
    } catch(error) {
        console.log('Argh! ' + error);
    }
}