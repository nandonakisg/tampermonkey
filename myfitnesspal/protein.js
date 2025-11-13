// ==UserScript==
// @name            MyFitnessPal Protein Ratio
// @version         2.1
// @description     Adds a "Protein Ratio" column after "Protein" with conditional formatting using Excel Accent6 and orange colors. Prevents wrapping in the first column.
// @include         http*://www.myfitnesspal.com/food/diary*
// ==/UserScript==

(function() {
	// Find indices for relevant columns
	let caloriesIndex = 0, proteinIndex = 0, proteinRatioIndex = 0;

	const headerRow = document.querySelector('.food_container tr.meal_header');
	const headerCells = headerRow.querySelectorAll('td');

	headerCells.forEach((cell, index) => {
		const text = cell.textContent.toLowerCase().trim();
		if (text.includes('calories')) caloriesIndex = index;
		if (text.includes('protein')) proteinIndex = index;
	});

	// Insert "Protein Ratio" column after "Protein"
	const rows = document.querySelectorAll('.food_container tr');
	rows.forEach(row => {
		const cells = row.querySelectorAll('td');
		const newCell = document.createElement('td');
		row.insertBefore(newCell, cells[proteinIndex + 1]);
	});

	// Adjust indices after insertion
	proteinRatioIndex = proteinIndex + 1;
	if (caloriesIndex >= proteinRatioIndex) caloriesIndex++;

	// Set "Protein Ratio" column header with proper classes
	const headerCell = headerRow.querySelectorAll('td')[proteinRatioIndex];
	headerCell.textContent = "Protein Ratio";
	headerCell.classList.add("alt", "nutrient-column");

	// Helper function to parse numeric values (removing commas)
	function parseNumeric(value) {
		return parseFloat(value.replace(/,/g, ''));
	}

	// Apply conditional formatting to a specific cell based on Excel-like colors
	function applyConditionalFormatting(cell, ratio) {
		let backgroundColor = "";
		let textColor = "black";

		// Accent and orange shades
		if (ratio < 10) {
			backgroundColor = "#FCE5CD"; // Light orange (20% shade)
		} else if (ratio >= 10 && ratio < 15) {
			backgroundColor = "#93C47D"; // Medium green (60% shade)
		} else {
			backgroundColor = "#38761D"; // Full green shade
			textColor = "white";
		}

		cell.style.backgroundColor = backgroundColor;
		cell.style.color = textColor;
	}

	// Prevent text wrapping in the first column (typically the name column)
	function preventTextWrapping() {
		const firstColumnCells = document.querySelectorAll('.food_container tr td:first-child');
		firstColumnCells.forEach(cell => {
			cell.style.whiteSpace = "nowrap";
			cell.style.overflow = "hidden";
			cell.style.textOverflow = "ellipsis";
		});
	}

	// Calculate and populate the protein ratio (as grams per calorie) for each food item
	rows.forEach(row => {
		const cells = row.querySelectorAll('td');
		if (cells.length > proteinRatioIndex && cells[caloriesIndex] && cells[proteinIndex]) {
			const calories = parseNumeric(cells[caloriesIndex].textContent);
			const protein = parseNumeric(cells[proteinIndex].textContent);

			if (!isNaN(calories) && calories !== 0 && !isNaN(protein)) {
				// Protein ratio: (grams of protein / total calories) * 100
				const proteinRatio = Math.round((protein / calories) * 100);
				const proteinRatioCell = cells[proteinRatioIndex];
				proteinRatioCell.textContent = proteinRatio + "%";
				applyConditionalFormatting(proteinRatioCell, proteinRatio);
			}
		}
	});

	// Call the function to prevent wrapping
	preventTextWrapping();
})();
