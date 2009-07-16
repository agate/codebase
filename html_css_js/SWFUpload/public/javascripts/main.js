/*
 * callback steps
 *
 * 1. swfuploadLoaded
 * 2. fileDialogStart -- when you clicked the button
 * 3. fileQueued [n+] -- when you selected files and clicked the ok
 * 4. fileDialogComplete
 * ----------- [5 - 7] one more times ---------------
 * 5. uploadStart
 * 6. uploadProgress
 *    a. start    -- byte 0 -- total byte X
 *    b. progress -- byte n -- total byte X
 *    c. finished -- byte X -- total byte X
 * 7. uploadComplete
 *
 */

$(document).ready(function () {
  var uploader = new Uploader();
  uploader.run();
});

var Uploader = function () {}; Uploader.prototype = {
  run: function () {
    this.initHTML();
    this.buildSWFUploader();
  },

  initHTML: function () {
    this.jq     = $('#swf:first');
    this.jqForm = $('form:first');
  },

  buildSWFUploader: function () {
    var self  = this;
    this.swfu = new SWFUpload({
      upload_url:     '/upload',
      flash_url:      '/SWFUpload/swfupload.swf',
      file_post_name: 'file',

      debug: true,

      button_text:           'click',
      button_placeholder_id: 'swf',
      button_width:          '116',
      button_height:         '25',


      // callbacks
      swfupload_loaded_handler:     function () { self.swfuploadLoaded(arguments); },
      file_dialog_start_handler:    function () { self.fileDialogStart(arguments); },
      file_dialog_complete_handler: function () { self.fileDialogComplete(arguments); },
      file_queued_handler:          function () { self.fileQueued(arguments); },
      file_queue_error_handler:     function () { self.fileQueueError(arguments); },
      upload_start_handler:         function () { self.uploadStart(arguments); },
      upload_progress_handler:      function () { self.uploadProgress(arguments); },
      upload_error_handler:         function () { self.uploadError(arguments); },
      upload_success_handler:       function () { self.uploadSuccess(arguments); },
      upload_complete_handler:      function () { self.uploadComplete(arguments); }
    });
  },

  swfuploadLoaded: function () {
    console.log('swfuploadLoaded: ', arguments, this);
  },

  fileDialogStart: function () {
    console.log('fileDialogStart: ', arguments, this);
  },

  fileDialogComplete: function () {
    console.log('fileDialogComplete: ', arguments, this);
    this.swfu.startUpload();
  },

  fileQueued: function () {
    console.log('fileQueued: ', arguments, this);
  },

  fileQueueError: function () {
    console.log('fileQueueError: ', arguments, this);
  },

  uploadStart: function () {
    console.log('uploadStart: ', arguments, this);
  },

  uploadProgress: function () {
    console.log('uploadProgress: ', arguments, this);
  },

  uploadError: function () {
    console.log('uploadError: ', arguments, this);
  },

  uploadSuccess: function () {
    console.log('uploadSuccess: ', arguments, this);
  },

  uploadComplete: function () {
    console.log('uploadComplete: ', arguments, this);
  }
}
