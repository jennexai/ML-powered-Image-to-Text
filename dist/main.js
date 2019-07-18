/**
 * @author ElLooper https://github.com/elLooper
 */

function progressUpdate(packet)
 {
        var log = document.getElementById('log');

        if (log.firstChild && log.firstChild.status === packet.status) {
            if ('progress' in packet) {
                var progress = log.firstChild.querySelector('progress')
                progress.value = packet.progress
            }
        } else {
            var line = document.createElement('div');
            line.status = packet.status;
            var status = document.createElement('div');
            status.className = 'status';
			
            if ('progress' in packet) {
                var progress = document.createElement('progress')
                progress.value = packet.progress
                progress.max = 1
                line.appendChild(progress)
            }

            if (packet.status == 'done') {
                var pre = document.createElement('pre')
				pre.className = "output";
                pre.appendChild(document.createTextNode(packet.data.text))
                line.innerHTML = ''
                line.appendChild(pre)

            }

            log.insertBefore(line, log.firstChild)
        }
    }

    function recognizeFile(file) {

        if (document.querySelector('#langsel').value == "") {
            //	log.appendChild("Invalid");return;
            document.querySelector("#log").innerHTML = "<p class='error'>Please select a Language!</p>";
            return;
        }
        document.querySelector("#log").innerHTML = ''
        const corePath = window.navigator.userAgent.indexOf("Edge") > -1 ? 'C:/EdRevUI1.0/node_module/tesseract.js-core/tesseract-core.asm.js' : 'C:/EdRevUI1.0/node_modules/tesseract.js-core/tesseract-core.wasm.js';

        const {
            TesseractWorker
        } = Tesseract;

        const worker = new TesseractWorker({
            corePath,
        });

        worker.recognize(file,
                document.querySelector('#langsel').value
            )
            .progress(function(packet) {
                console.info(packet);
                progressUpdate(packet);

            })
            .then(function(data) {
                console.log(data)
                progressUpdate({
                    status: 'done',
                    data: data
                })
            })
    }