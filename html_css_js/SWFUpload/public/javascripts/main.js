/*
 * callback steps
 *
 * 1. swfuploadLoaded
 *
 * 2. fileDialogStart -- when you clicked the button
 *
 * ----------- [3] one more times ---------------
 * 3. fileQueued -- when you selected files and clicked the ok
 * ----------- [3] one more times ---------------
 *
 * 4. fileDialogComplete
 *
 * ----------- [5 - 6] one more times -----------
 * 5. uploadStart
 *
 * 6. uploadProgress
 *    a. start    -- byte 0 -- total byte X
 *    b. progress -- byte n -- total byte X
 *    c. finished -- byte X -- total byte X
 * ----------- [5 - 6] one more times -----------
 *
 * 7. uploadComplete
 *
 */

$(document).ready(function () {
  var uploader = new Uploader();
});

var Uploader = function () { this.initialize.apply(this, arguments); }; Uploader.prototype = {
  initialize: function () {
    this.initHTML();
    this.buildSWFUploader();
  },

  initHTML: function () {
    this.jq         = $('#swf');
    this.jqProgress = $('#progress');
    this.jqForm     = $('form:first');
  },

  buildSWFUploader: function () {
    var self    = this;
    this.queues = {};
    this.swfu   = new SWFUpload({
      upload_url:     '/upload',
      flash_url:      '/SWFUpload/swfupload.swf',
      file_post_name: 'file',

      debug: true,

      // Button settings
      button_placeholder_id: 'swf',
      button_image_url:      "/SWFUpload/uploader_button.png",
      button_width:          "116",
      button_height:         "25",
      button_window_mode:    SWFUpload.WINDOW_MODE.TRANSPARENT,


      // callbacks
      swfupload_loaded_handler:     function () { self.swfuploadLoaded.apply(self, arguments); },

      file_dialog_start_handler:    function () { self.fileDialogStart.apply(self, arguments); },
      file_queued_handler:          function () { self.fileQueued.apply(self, arguments); },
      file_queue_error_handler:     function () { self.fileQueueError.apply(self, arguments); },
      file_dialog_complete_handler: function () { self.fileDialogComplete.apply(self, arguments); },

      upload_start_handler:         function () { self.uploadStart.apply(self, arguments); },
      upload_progress_handler:      function () { self.uploadProgress.apply(self, arguments); },
      upload_error_handler:         function () { self.uploadError.apply(self, arguments); },
      upload_success_handler:       function () { self.uploadSuccess.apply(self, arguments); },

      upload_complete_handler:      function () { self.uploadComplete.apply(self, arguments); }
    });
  },

  swfuploadLoaded: function () {
    console.log('swfuploadLoaded: ', arguments, this);
    this.jqForm.hide();
  },

  fileDialogStart: function () {
    console.log('fileDialogStart: ', arguments, this);
  },

  fileQueued: function (file) {
    console.log('fileQueued: ', arguments, this);
    this.queues[file.id] = new Progress(this.jqProgress);
  },

  fileQueueError: function (file, errorCode, message) {
    console.log('fileQueueError: ', arguments, this);
  },

  fileDialogComplete: function (selectedNum, queuedNum, totalQueuedNum) {
    console.log('fileDialogComplete: ', arguments, this);
    this.swfu.startUpload();
  },

  uploadStart: function (file) {
    console.log('uploadStart: ', arguments, this);
  },

  uploadProgress: function (file, complete, total) {
    console.log('uploadProgress: ', arguments, this);
    var percent = Math.round(complete / total) * 100;
    this.queues[file.id].setPercent(percent);
  },

  uploadError: function (file, errorCode, message) {
    console.log('uploadError: ', arguments, this);
  },

  uploadSuccess: function (file, serverData, response) {
    console.log('uploadSuccess: ', arguments, this);
  },

  uploadComplete: function (file) {
    console.log('uploadComplete: ', arguments, this);
  }
};

var Progress = function () { this.initialize.apply(this, arguments); }; Progress.prototype = {
  initialize: function (jqSeed) {
    this.jqSeed = jqSeed;
    this.initHTML();
  },

  initHTML: function () {
    this.jq = $('<div>0%</div>');
    this.jqSeed.append(this.jq);
  },

  setPercent: function (percent) {
    this.jq.html(percent + '%');
    if (percent == 100) {
      this.finished();
    }
  },

  finished: function () {
    var self = this;
    setTimeout(function () {
      self.jq.hide('slow');
    }, 3000);
  }
};
