const SHEET_ID = '1dzLSgQwH17jPUH-y3eBv6CZ5QMAmsrR9SlnhzWty3bE';
const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'ID',
  'Timestamp',
  'Student ID / QR',
  'Student Name',
  'Grade',
  'Section',
  'Adviser',
  'Occurrence #',
  'Notes'
];

/**
 * SERVE THE BANTAI WEB APP
 */
function doGet(e) {
  // If query parameters are provided, return JSON API output
  if (e && e.parameter && e.parameter.action === 'getIncidents') {
    return ContentService.createTextOutput(JSON.stringify(getIncidents()))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('Bantai - Project RAI')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * RECEIVE WEBHOOK POST FROM BANTAI TRACKER (FETCH API)
 */
function doPost(e) {
  try {
    const rawData = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : null;
    if (!rawData) {
      throw new Error('No JSON payload detected in request body.');
    }

    const saved = saveIncident(rawData);
    return ContentService.createTextOutput(JSON.stringify(saved))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * CREATE / SAVE INCIDENT
 *
 * Called via doPost(e) or google.script.run.saveIncident(data)
 */
function saveIncident(data) {
  if (!data) {
    throw new Error('No incident data received.');
  }

  const sheet = getSheet_();
  ensureHeaders_(sheet);

  const id = String(data.id || Utilities.getUuid());
  const timestamp = data.timestamp || new Date().toISOString();
  const studentId = String(data.studentId || data.qrCode || '').trim();
  const occurrence = Number(data.occurrenceNumber || 1);

  const row = [
    id,
    timestamp,
    studentId,
    String(data.studentName || '').trim(),
    String(data.grade || '').trim(),
    String(data.section || '').trim(),
    String(data.adviser || '').trim(),
    occurrence,
    String(data.notes || '').trim()
  ];

  sheet.appendRow(row);

  return {
    result: 'success',
    data: {
      id: row[0],
      timestamp: row[1],
      studentId: row[2],
      studentName: row[3],
      grade: row[4],
      section: row[5],
      adviser: row[6],
      occurrenceNumber: row[7],
      notes: row[8]
    }
  };
}

/**
 * GET ALL INCIDENTS
 *
 * Returns newest records first.
 */
function getIncidents() {
  const sheet = getSheet_();
  ensureHeaders_(sheet);

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return [];
  }

  const values = sheet
    .getRange(2, 1, lastRow - 1, HEADERS.length)
    .getValues();

  return values
    .map(function(row) {
      return {
        id: String(row[0] || ''),
        timestamp: normalizeTimestamp_(row[1]),
        studentId: String(row[2] || ''),
        studentName: String(row[3] || ''),
        grade: String(row[4] || ''),
        section: String(row[5] || ''),
        adviser: String(row[6] || ''),
        occurrenceNumber: Number(row[7] || 1),
        notes: String(row[8] || '')
      };
    })
    .filter(function(item) {
      return item.id || item.studentName;
    })
    .reverse();
}

/**
 * DELETE INCIDENT
 */
function deleteIncident(id) {
  if (!id) {
    throw new Error('Incident ID is required.');
  }

  const sheet = getSheet_();
  ensureHeaders_(sheet);

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return {
      result: 'not_found'
    };
  }

  const ids = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .getValues();

  for (let i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === String(id)) {
      sheet.deleteRow(i + 2);
      return {
        result: 'success',
        id: String(id)
      };
    }
  }

  return {
    result: 'not_found',
    id: String(id)
  };
}

/**
 * GET GOOGLE SHEET
 */
function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  return sheet;
}

/**
 * CREATE HEADERS IF NECESSARY
 */
function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setValues([HEADERS]);

    sheet.setFrozenRows(1);
    return;
  }

  const current = sheet
    .getRange(1, 1, 1, HEADERS.length)
    .getValues()[0];

  const needsHeaders = HEADERS.some(function(header, index) {
    return String(current[index] || '').trim() !== header;
  });

  if (needsHeaders) {
    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setValues([HEADERS]);

    sheet.setFrozenRows(1);
  }
}

/**
 * NORMALIZE TIMESTAMP
 */
function normalizeTimestamp_(value) {
  if (
    Object.prototype.toString.call(value) === '[object Date]' &&
    !isNaN(value)
  ) {
    return value.toISOString();
  }

  const text = String(value || '');
  const date = new Date(text);

  return isNaN(date.getTime())
    ? text
    : date.toISOString();
}