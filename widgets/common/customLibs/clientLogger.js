  var myLogger = log4javascript.getLogger();
  var ajaxAppender = new log4javascript.AjaxAppender('./logger');
  ajaxAppender.setLayout(new log4javascript.JsonLayout());
  ajaxAppender.setBatchSize(3);
  myLogger.addAppender(ajaxAppender);

  myLogger.debug('Debug from myLogger');
  window.myLogger.debug('Debug from window.myLogger');
