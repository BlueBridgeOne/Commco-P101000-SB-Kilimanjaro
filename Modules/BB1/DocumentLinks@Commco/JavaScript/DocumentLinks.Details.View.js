define('DocumentLinks.Details.View', [
  'Backbone', 'document_links_details.tpl'
], function (
  Backbone, document_links_details_tpl
) {
  'use strict';

  return Backbone.View.extend({
    template: document_links_details_tpl

      ,
    getContext: function () {
      var icon = "file-word-o",
        fgcolor = "white",
        bgcolor = "#002c8d";
      switch (this.model.get('filetype')) {
        case 1:
          icon = "file-word-o";
          break;
        case 2:
          icon = "file-excel-o";
          bgcolor = "#397f41";
          break;
        case 3:
          icon = "file-pdf-o";
          bgcolor = "#ad362b";
          break;
        case 4:
          icon = "file-image-o";
          bgcolor = "#ec9839";
          break;
        case 5:
          icon = "file-video-o";
          bgcolor = "#41b0ec";
          break;
        case 6:
          icon = "file-audio-o";
          bgcolor = "#1e77c3";
          break;
        case 7:
          icon = "file-powerpoint-o";
          bgcolor = "#d06628";
          break;
        case 8:
          icon = "file-zip-o";
          bgcolor = "#e4bd35";
          break;

      }
      return {
        'internalid': this.model.get('internalid'),
        'name': this.model.get('name'),
        'filetype': this.model.get('filetype'),
        'link': this.model.get('link'),
        'icon': icon,
        'bgcolor': bgcolor,
        'fgcolor': fgcolor
      }
    }
  })
});