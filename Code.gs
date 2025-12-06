function dailyVitaminsCheck() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  const THRESHOLD = 15;
  const EMAIL = Session.getActiveUser().getEmail(); // send to yourself

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let row = 1; row < data.length; row++) {
    const name = data[row][0];
    let count = data[row][1];
    const frequency = data[row][2];
    const lastTaken = new Date(data[row][3]);
    let lowAlert = data[row][4]; // TRUE/FALSE

    lastTaken.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today - lastTaken) / (1000 * 60 * 60 * 24));

    // Reduce only when count > 0 AND required days passed
    if (diffDays >= frequency && count > 0) {
      count = Math.max(0, count - 1);

      sheet.getRange(row + 1, 2).setValue(count);
      sheet.getRange(row + 1, 4).setValue(today);
    }

    //
    // 1) Send LOW STOCK email once
    //
    if (count < THRESHOLD && lowAlert !== true) {

      // Send email alert
      MailApp.sendEmail({
        to: EMAIL,
        subject: `Low stock: ${name}`,
        body: `${name} is running low.\nOnly ${count} remaining.\nTime to restock.`
      });

      // Mark alert as sent
      sheet.getRange(row + 1, 5).setValue(true);

      // Highlight row red
      sheet.getRange(row + 1, 1, 1, 5)
           .setBackground("#ff9999");
    }

    //
    // 2) Auto-reset alert when restocked
    //
    if (count >= THRESHOLD && lowAlert === true) {
      // Reset flag
      sheet.getRange(row + 1, 5).setValue(false);

      // Remove highlight
      sheet.getRange(row + 1, 1, 1, 5)
           .setBackground(null);
    }

    //
    // 3) Apply highlight for ongoing low stock
    //
    if (count < THRESHOLD) {
      sheet.getRange(row + 1, 1, 1, 5)
           .setBackground("#ff9999");
    } else {
      sheet.getRange(row + 1, 1, 1, 5)
           .setBackground(null);
    }
  }
}
