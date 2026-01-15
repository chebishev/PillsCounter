📘 Vitamin & Supplement Tracker (Google Sheets + Apps Script)

A smart Google Sheets system that automatically tracks supplement usage, reduces inventory based on frequency, warns you when stock is low, sends email alerts, and highlights low items visually.
Powered entirely by Google Apps Script, with no external dependencies.

✨ Features
👍 Automatic Daily Consumption

Each supplement has its own frequency (e.g., every 1 day, every 2 days, every 5 days).

The script reduces the count only when the correct number of days has passed.

Counts never go below zero.

🟧 Low Stock Alerts (Email)

When a supplement’s count falls below the threshold (default: 15):

An email alert is sent to you only once.

Alerts automatically reset after restocking.

🎨 Color Highlighting

Supplements below threshold are highlighted red.

Highlight is removed automatically after restock.

🔄 Automatic Reset After Refill

When you manually enter a new count above threshold:

Low-stock flag resets

Highlight is cleared

Future alerts will work again

⏰ Daily Automation

Set up a time-based trigger to run the script once per day.

📊 Sheet Structure

Your Google Sheet must use these columns:

Column	Name	Description
A	Vitamin	Name of the supplement
B	Count	Current number of pills
C   Dosage    Dosage per dose
D	Frequency	Days between each dose (1 = daily, 2 = every 2 days…)
E	Last Taken	Date last reduced (auto-updated)
F	Low Alert Sent	Boolean flag (TRUE/FALSE)

Example:

Vitamin	        Count   Dosage	Frequency	Last Taken	Low Alert Sent
Vitamin C-500	100	    1	    1           2025-12-05	FALSE
Vitamin D3	    240	    1	    1           2025-12-04	FALSE

(or in the xslx file)