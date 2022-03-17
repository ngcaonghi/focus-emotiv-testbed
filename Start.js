import connectBLE from './ConnectBLE.js';
import { characteristics } from './Constants.js';
import { writeCommand } from './WriteCommand.js';

export async function start(pgID) {
    try {
        console.log('Connecting');
        const service = await connectBLE();
        const command = await 
                        service.getCharacteristic(characteristics['command']);
        const startCommand = writeCommand('program', 'start', [pgID]);
        console.log('Starting program ' + pgID);
        await command.writeValue(startCommand);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}