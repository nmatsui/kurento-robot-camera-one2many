import $ from 'jquery';
import 'bootstrap';
import * as utils from './libs/utils';
import * as socket from './libs/socket';

$(document).ready(() => {
    let localStream = $('#localStream').get(0);
    let $passPhrase = $('#passPhrase')
    let $cameraId = $('#cameraId')

    $('#start').on('click', () => {
        console.log('start button clicked');
        let passPhrase = $passPhrase.val();
        if (!passPhrase || passPhrase.length == 0) {
            console.error('passPhrase is not set');
            return false;
        }
        let cameraId = $cameraId.val();
        if (!cameraId || cameraId.length == 0) {
            console.error('cameraId is not set');
            return false;
        }

        socket.start(passPhrase, cameraId, localStream, null);
    });

    $('#stop').on('click', () => {
        console.log('stop button clicked');
        socket.stop();
    });

    utils.setUp(utils.Pages.CAMERA);
    socket.connect();
    console.log('camera page ready');
});

$(window).on('beforeunload', () => {
    socket.disconnect();
    utils.tearDown();
});
