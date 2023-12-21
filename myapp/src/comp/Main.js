import React, { useCallback, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

export const Main = () => {
  // function onScanSuccess(decodedText, decodedResult) {
  //   // handle the scanned code as you like, for example:
  //   console.log(`Code matched = ${decodedText}`, decodedResult);
  // }

  // function onScanFailure(error) {
  //   // handle scan failure, usually better to ignore and keep scanning.
  //   // for example:
  //   console.warn(`Code scan error = ${error}`);
  // }

  // let html5QrcodeScanner;

  const [scanning, setScanning] = useState(false);

  let html5QrCode;
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
  }, []);

  const getCameras = async () => {
    return await Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          return devices[0].id;
          // .. use this to start scanning.
        }
        return null;
      })
      .catch((err) => {
        // handle err
      });
  };

  const scan = () => {
    getCameras().then((cameraId) => {
      debugger;

      html5QrCode
        .start(
          cameraId,
          {
            fps: 10, // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
          },
          (decodedText, decodedResult) => {
            
            console.log('success', decodedText, decodedResult);
            // do something when code is read

            window.open(decodedText, '_blank')
          },
          (errorMessage) => {
            console.log('error',errorMessage);
            // parse error, ignore it.
          }
        )
        .catch((err) => {
          // Start failed, handle it.
        });
    });
  };

  const stopScan =useCallback(()=>{
    html5QrCode.stop().then((ignore) => {
      // QR Code scanning is stopped.
    }).catch((err) => {
      // Stop failed, handle it.
    });
  },[html5QrCode])
  // File based scanning


  console.log('render')
  return (
    <div>
      <div id="reader" style={{ width: "600px", minHeight: "500px" }}></div>

      <button
        onClick={() => {
          if (!scanning){
            setScanning(true)
            scan();
          }
          else {
            setScanning(false)
            stopScan()
          }
        }}
      >
        scan
      </button>
    </div>
  );
};
