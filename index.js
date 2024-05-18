/** @format */

;(function (global) {
	global.ScrollTopOnClick = function ({
		scrollTriggerSelectors = [],
		windowScroll = true,
		windowScrollToSelector = '',
		windowScrollOffset = 0,
		windowScrollDelay = 500,
		scrollAreas = [
			{
				selector: '',
				offset: 0,
			},
		],
		scrollAreaScrollDelay = 500,
	}) {
		function handleAreaScroll(area, offset = 0) {
			const areaToScroll = document.querySelectorAll(area)
			areaToScroll.forEach((scrollElement) => {
				setTimeout(() => {
					scrollElement.scroll({
						top: offset,
						behavior: 'smooth',
					})
				}, scrollAreaScrollDelay)
			})
		}

		function addScrollTriggerEvent(triggerSelectors) {
			triggerSelectors.forEach((triggerSelector) => {
				triggerSelector.addEventListener('click', function (e) {
					if (scrollAreas.length > 0) {
						const anyValidSelector = scrollAreas.some(
							(area) => area.selector && area.selector.trim() !== '',
						)

						if (anyValidSelector) {
							scrollAreas.forEach((area) => {
								if (area.selector && area.selector.trim() !== '') {
									handleAreaScroll(area.selector, area.offset)
								}
							})
						}
					}

					if (windowScroll) {
						setTimeout(() => {
							if (windowScrollToSelector) {
								const scrollTarget = document.querySelector(
									windowScrollToSelector,
								)
								if (scrollTarget) {
									const y =
										scrollTarget.getBoundingClientRect().top + window.scrollY
									window.scroll({
										top: y - windowScrollOffset,
										behavior: 'smooth',
									})
								} else {
									console.error(
										'Cannot find the windowScrollToSelector element. Please double check the "windowScrollToSelector" variable to make sure that selector/class name exists.',
									)
								}
							} else {
								window.scroll({
									top: 0 + windowScrollOffset,
									behavior: 'smooth',
								})
							}
						}, windowScrollDelay)
					}
				})
			})
		}

		;[...new Set(scrollTriggerSelectors)].forEach((selector) => {
			const selectors = document.querySelectorAll(selector)
			addScrollTriggerEvent(selectors)
		})
	}
})((globalThis.CodeCrumbs = globalThis.CodeCrumbs || {}))
