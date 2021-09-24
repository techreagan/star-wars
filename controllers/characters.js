const asyncHandler = require('../middleware/async')

const CharacterService = require('../services/CharacterService')

// @desc    Get all characters
// @route   GET /api/v1/characters
// @access  Public
exports.getCharacters = asyncHandler(async (req, res, next) => {
	const characters = await CharacterService.getCharacters(req.url)

	const sort = req.query.sort
	const filter = req.query.filter

	if (sort) {
		let splitSort = sort.split('')

		let fa, fb

		characters.data.results = characters.data.results.sort((a, b) => {
			if (sort.substring(1) === 'height' || sort === 'height') {
				fa =
					splitSort[0] === '-'
						? parseInt(b[sort.substring(1)])
						: parseInt(a[sort])
				fb =
					splitSort[0] === '-'
						? parseInt(a[sort.substring(1)])
						: parseInt(b[sort])
				return fa - fb
			} else {
				fa =
					splitSort[0] === '-'
						? b[sort.substring(1)].toLowerCase()
						: a[sort].toLowerCase()
				fb =
					splitSort[0] === '-'
						? a[sort.substring(1)].toLowerCase()
						: b[sort].toLowerCase()

				if (fa < fb) {
					return -1
				}
				if (fa > fb) {
					return 1
				}
				return 0
			}
		})
	}

	if (filter) {
		characters.data.results = characters.data.results.filter(
			(character) => character.gender.toLowerCase() === filter.toLowerCase()
		)
	}

	let totalCharacters = 0
	let totalHeight = 0

	characters.data.results.forEach((character) => {
		totalCharacters++
		totalHeight += parseInt(character.height)
	})

	characters.data.metadata = {
		totalCharacters,
		height: {
			cm: totalHeight,
			ft: totalHeight * 0.0328084,
			inches: totalHeight / 2.54,
		},
	}

	res.status(200).json(characters.data)
})
