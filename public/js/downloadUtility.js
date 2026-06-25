var downloadUtility = {};
downloadUtility.restartDownload = function () {
    document.location = sessionStorage.getItem('downloadUrl');
    return false;
};
downloadUtility.execute = function (settings) {
    // Shared Props
    settings = settings || {};
    var trackingId, productResourceId,
        goalDownloadType = settings.googleEventTypeDownload || "",
        goalDownloadLabel = settings.googleEventLabelDownload || "",
        apiUrl = (document.location.hostname.indexOf('staging') > 0) ? "staging.infragistics.com" : "www.infragistics.com",
        noDownloadRedirectUrl = document.referrer || document.location.protocol + "//" + document.location.hostname;

    function getDownloadParams() {
        var downloadParamsJson = sessionStorage.getItem('initDownloadParams');
        if (downloadParamsJson) {
            // Get the download Params from storage
            var downloadParams = JSON.parse(downloadParamsJson);

            // Clear storage
            sessionStorage.removeItem('initDownloadParams');

            // Set the utility shared props
            trackingId = downloadParams.leadTrackingEventId;
            productResourceId = downloadParams.productResourceId;

            goalDownloadType = (goalDownloadType !== "") ? goalDownloadType : ((downloadParams.ga.goalType !== "") ? downloadParams.ga.goalType : "");
            goalDownloadLabel = (goalDownloadLabel !== "") ? goalDownloadLabel : ((downloadParams.ga.goalLabel !== "") ? downloadParams.ga.goalLabel : "");
        } else {
            document.location = noDownloadRedirectUrl;
        }
    }

    function initDownload() {
        getDownloadParams();

        // Create InitiateDownloadRequest payload
        var initiateDownloadRequest = {
            leadTrackingEventId: trackingId
        };

        if (goalDownloadType !== "" && goalDownloadLabel !== "") {
            dataLayer.push({
                'event': 'trackGoal',
                'goalType': goalDownloadType,
                'goalLabel': goalDownloadLabel
            });
        }

        if (productResourceId) {
            var url = `${window.location.protocol}//${apiUrl}/api/productresources/${productResourceId}/initiatedownload`;
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            xhr.open('POST', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // Start download
                        downloadUrl = JSON.parse(xhr.responseText);
                        document.location = downloadUrl;
                    } else {
                        document.location = noDownloadRedirectUrl;
                    }
                }
            };
            // What to do if there's an error with the request
            xhr.onerror = function (e) {
                document.location = noDownloadRedirectUrl;
            }; // End of error handling
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(initiateDownloadRequest));
        } else {
            document.location = noDownloadRedirectUrl;
        }

    }

    initDownload();
};
