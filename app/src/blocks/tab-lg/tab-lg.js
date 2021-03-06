var
	classTab = 'tab-lg', // Класс блока
	classHead = classTab + '__head', // Класс шапки табов
	classBody = classTab + '__body', // Класс тела табов
	classPanel = classTab + '__panel', // Класс панели табов
	classTitle = classTab + '__title', // Класс заголовка табов
	classTitleActive = classTitle + '_active', // Класс активного заголовка
	classTitleInactive = classTitle + '_inactive', // Класс неактивного заголовка
	classPanelHidden = classPanel + '_hidden'; // Класс скрытой таблицы

$('.' + classTab).each(function() {
	var
		$this = $(this),
		$tabTitles = $this.find('.' + classHead + ':first > .' + classTitle), // Заголовки (салоны)
		$panel = $this.find('.' + classBody + ':first > .' + classPanel), // Таблицы с расписанием
		titleActiveIndex = 0;

	// Блокировка заголовков, которые ссылаются на несуществующие таблицы
	$tabTitles.each(function(i) {
		var
			$this = $(this),
			tableId = $this.attr('href'), // ID таблицы, на которую ссылается заголовок
			$thisTable = $(tableId); // Таблица

		if (!$thisTable.length) {
			$this.addClass(classTitleInactive);
			titleActiveIndex++;
		} else {
			if (titleActiveIndex == i) {
				if (($this.attr('data-club') == $.cookie('club')) || $this.attr('data-club') === undefined) {
					$thisTable.removeClass(classPanelHidden);
					$this.addClass(classTitleActive);
				} else {
					titleActiveIndex++;
				}
			}
		}
	});
	// =====

	$tabTitles.on('click', function(event) {
		event.preventDefault();

		var
			$this = $(this),
			tableId = $this.attr('href'), // ID таблицы, на которую ссылается заголовок
			$thisTable = $(tableId); // Таблица

		if ($this.hasClass(classTitleActive) || $this.hasClass(classTitleInactive)) return;

		$panel.addClass(classPanelHidden);
		$thisTable.removeClass(classPanelHidden);

		$tabTitles.removeClass(classTitleActive);
		$this.addClass(classTitleActive);

		var dataName;

		if ($this.attr('data-club') !== undefined && $this.attr('data-club') != '') {
			dataName = 'data-club';
		}

		if ($this.attr('data-salon') !== undefined && $this.attr('data-salon') != '') {
			dataName = 'data-salon';
		}

		var
			cookie = $this.attr(dataName),
			$salonTitle = $('.salons__link[' + dataName + '-title=' + cookie + ']');

		if (!cookie || !$salonTitle.length) return;

		$salonTitle.click();
	});
});