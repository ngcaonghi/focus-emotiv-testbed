import connectBLE from './ConnectBLE.js';
import { characteristics } from './Constants.js';
import { writeCommand } from './WriteCommand.js';

export async function stop() {
    try {
        console.log('Connecting');
        const service = await connectBLE();
        const command = await 
                        service.getCharacteristic(characteristics['command']);
        const stopCommand = writeCommand('program', 'stop');
        console.log('Stopping program ' + pgID);
        await command.writeValue(stopCommand);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}