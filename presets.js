const { combineRgb } = require('@companion-module/base')

const CHOICES_SOURCES = [
	{ label: 'PHONO', id: 'PHONO' },
	{ label: 'CD', id: 'CD' },
	{ label: 'TUNER', id: 'TUNER' },
	{ label: 'DVD', id: 'DVD' },
	{ label: 'BluRay', id: 'BD' },
	{ label: 'HDP', id: 'HDP' },
	{ label: 'TV', id: 'TV' },
	{ label: 'TV/CBL', id: 'TV/CBL' },
	{ label: 'SAT/CBL', id: 'SAT/CBL' },
	{ label: 'SAT', id: 'SAT' },
	{ label: 'Media Player', id: 'MPLAY' },
	{ label: 'Game', id: 'GAME' },
	{ label: 'HD Radio', id: 'HDRADIO' },
	{ label: 'NET/Online', id: 'NET' },
	{ label: 'Pandora', id: 'PANDORA' },
	{ label: 'SiriusXM', id: 'SIRIUSXM' },
	{ label: 'Spotify', id: 'SPOTIFY' },
	{ label: 'LastFM', id: 'LASTFM' },
	{ label: 'Flickr', id: 'FLICKR' },
	{ label: 'iRadio', id: 'IRADIO' },
	{ label: 'Server', id: 'SERVER' },
	{ label: 'Favorites', id: 'FAVORITES' },
	{ label: 'VCR', id: 'VCR' },
	{ label: 'DVR', id: 'DVR' },
	{ label: 'V.AUX', id: 'V.AUX' },
	{ label: 'Aux1', id: 'AUX1' },
	{ label: 'Aux2', id: 'AUX2' },
	{ label: 'Aux3', id: 'AUX3' },
	{ label: 'Aux4', id: 'AUX4' },
	{ label: 'Bluetooth', id: 'BT' },
	{ label: 'NET/USB', id: 'NET/USB' },
	{ label: 'XM', id: 'XM' },
	{ label: '8K', id: '8K' },
	{ label: 'IPOD', id: 'IPOD' },
]
const PRESETS_LIST = [
	//{label: name of the action, id: action id, act: action name, cat: category}
	{ label: 'main power on', id: 'PWON', act: 'power', cat: 'Power' },
	{ label: 'zone 2 power on', id: 'Z2ON', act: 'power', cat: 'Power' },
	{ label: 'zone 3 power on', id: 'Z3ON', act: 'power', cat: 'Power' },
	{ label: 'main power off', id: 'PWSTANDBY', act: 'power', cat: 'Power' },
	{ label: 'zone 2 power off', id: 'Z2OFF', act: 'power', cat: 'Power' },
	{ label: 'zone 3 power off', id: 'Z3OFF', act: 'power', cat: 'Power' },
]
const PRESETS_VOL = [
	//VOLUME needs to be moved to its own area (or figure out the expansion problem)
	{ label: 'main zone volume up', id: 'MVUP', act: 'volume', cat: 'Volume' },
	{ label: 'main zone volume down', id: 'MVUDOWN', act: 'volume', cat: 'Volume' },
	{ label: 'zone 2 volume up', id: 'Z2UP', act: 'volume', cat: 'Volume' },
	{ label: 'zone 2 volume down', id: 'Z2DOWN', act: 'volume', cat: 'Volume' },
	{ label: 'zone 3 volume up', id: 'Z3UP', act: 'volume', cat: 'Volume' },
	{ label: 'zone 3 volume down', id: 'Z3DOWN', act: 'volume', cat: 'Volume' },
]
const PRESETS_SURROUND = [
	{ label: 'Surround mode Music', id: 'MSMUSIC', act: 'surround', cat: 'Surround' },
	{ label: 'Surround mode Game', id: 'MSGAME', act: 'surround', cat: 'Surround' },
	{ label: 'Surround mode Direct', id: 'MSDIRECT', act: 'surround', cat: 'Surround' },
	{ label: 'Surround mode Pure Direct', id: 'MSPURE DIRECT', act: 'surround', cat: 'Surround' },
	{ label: 'Surround mode Stereo', id: 'MSSTEREO', act: 'surround', cat: 'Surround' },
	{ label: 'Surround mode Auto', id: 'MSAUTO', act: 'surround', cat: 'Surround' },
	{ label: 'Surround mode Dolby Digital', id: 'MSDOLBY DIGITAL', act: 'surround', cat: 'Surround' },
	{ label: 'Surround mode DTS', id: 'MSDTS SURROUND', act: 'surround', cat: 'Surround' },
]
const PRESETS_SETVOL = [
	{ 
        label: 'set volume zone 1', 
        actID: 'set_volume', 
        opt1: 'zone', 
        val1: 'MV', 
        opt2: 'set_volume', 
        val2: '00', 
        cat: 'Volume',	
    },
	{
		label: 'set volume zone 2',
		actID: 'set_volume',
		opt1: 'zone',
		val1: 'Z2',
		opt2: 'set_volume',
		val2: '00',
		cat: 'Volume',
	},
	{
		label: 'set volume zone 3',
		actID: 'set_volume',
		opt1: 'zone',
		val1: 'Z3',
		opt2: 'set_volume',
		val2: '00',
		cat: 'Volume',
	},
]
const PRESETS_NAVIGATE = [
	{ label: 'up', id: 'MNCUP', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'down', id: 'MNCDN', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'left', id: 'MNCLT', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'right', id: 'MNCRT', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'enter', id: 'MNENT', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'return', id: 'MNRTN', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'option', id: 'MNOPT', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'info', id: 'MNINF', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'setup menu on', id: 'MNMEN ON', act: 'navigate', cat: 'Menu navigation' },
	{ label: 'setup menu off', id: 'MNMEN OFF', act: 'navigate', cat: 'Menu navigation' },
]

module.exports = {
	initPresets: function () {
		const presets = {}

		for (let x in PRESETS_SETVOL) {
			//Presets for actions with two values
			presets[PRESETS_SETVOL[x].cat + '_' + PRESETS_SETVOL[x].actID + PRESETS_SETVOL[x].val1] = {
				type: 'button',
				category: PRESETS_SETVOL[x].cat,
				name: PRESETS_SETVOL[x].label,
				style: {
					text: PRESETS_SETVOL[x].label + '\\n',
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: PRESETS_SETVOL[x].actID,
								options: {
									zone: PRESETS_SETVOL[x].val1,
									set_volume: PRESETS_SETVOL[x].val2,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
			console.log('preset created -->', PRESETS_SETVOL[x].cat + '_' + PRESETS_SETVOL[x].actID + PRESETS_SETVOL[x].val1)
		}

		for (let x in PRESETS_LIST) {
			//Make presets based on above PRESETS_LIST
			presets[PRESETS_LIST[x].cat + PRESETS_LIST[x].id] = {
				type: 'button', // This must be 'button' for now
				category: PRESETS_LIST[x].cat, // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: PRESETS_LIST[x].label, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: PRESETS_LIST[x].label + '\\n', // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: PRESETS_LIST[x].act,
								options: {
									// options values to use
									power: PRESETS_LIST[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [], // You can add some presets from your module here
			}
		}

		for (let x in PRESETS_VOL) {
			//Make presets based on above PRESETS_LIST
			presets[PRESETS_VOL[x].cat + PRESETS_VOL[x].id] = {
				type: 'button', // This must be 'button' for now
				category: PRESETS_VOL[x].cat, // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: PRESETS_VOL[x].label, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: PRESETS_VOL[x].label + '\\n', // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: PRESETS_VOL[x].act,
								options: {
									// options values to use
									volume: PRESETS_VOL[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [], // You can add some presets from your module here
			}
		}

		for (let x in PRESETS_SURROUND) {
			//Make presets based on above PRESETS_LIST
			presets[PRESETS_SURROUND[x].cat + PRESETS_SURROUND[x].id] = {
				type: 'button', // This must be 'button' for now
				category: PRESETS_SURROUND[x].cat, // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: PRESETS_SURROUND[x].label, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: PRESETS_SURROUND[x].label + '\\n', // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: PRESETS_SURROUND[x].act,
								options: {
									// options values to use
									surround: PRESETS_SURROUND[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [], // You can add some presets from your module here
			}
		}

		for (let x in PRESETS_NAVIGATE) {
			//Make presets based on above PRESETS_LIST
			presets[PRESETS_NAVIGATE[x].cat + PRESETS_NAVIGATE[x].id] = {
				type: 'button', // This must be 'button' for now
				category: PRESETS_NAVIGATE[x].cat, // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: PRESETS_NAVIGATE[x].label, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: PRESETS_NAVIGATE[x].label + '\\n', // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: PRESETS_NAVIGATE[x].act,
								options: {
									// options values to use
									navigate: PRESETS_NAVIGATE[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [], // You can add some presets from your module here
			}
		}

		for (let x in CHOICES_SOURCES) {
			//Main Zone Source presets
			presets['mainzone_src' + CHOICES_SOURCES[x].id] = {
				type: 'button',
				category: 'Main Zone Sources',
				name: `main zone ` + CHOICES_SOURCES[x].label,
				style: {
					text: CHOICES_SOURCES[x].label + '\\n',
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: 'source',
								options: {
									zone: 'SI',
									source: CHOICES_SOURCES[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}

		for (let x in CHOICES_SOURCES) {
			//zone 2 source presets
			presets['z2_src' + CHOICES_SOURCES[x].id] = {
				type: 'button',
				category: 'Zone 2 Sources',
				name: `Zone 2 ` + CHOICES_SOURCES[x].label,
				style: {
					text: CHOICES_SOURCES[x].label + '\\n',
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: 'source',
								options: {
									zone: 'Z2',
									source: CHOICES_SOURCES[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
		for (let x in CHOICES_SOURCES) {
			//zone 3 source presets
			presets['z3_src' + CHOICES_SOURCES[x].id] = {
				type: 'button',
				category: 'Zone 3 Sources',
				name: `Zone 3 ` + CHOICES_SOURCES[x].label,
				style: {
					text: CHOICES_SOURCES[x].label + '\\n',
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: 'source',
								options: {
									zone: 'Z3',
									source: CHOICES_SOURCES[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}

		//others
		presets.z2sameAsZ1 = {
			type: 'button',
			category: 'Zone 2 Sources',
			name: `Same as Zone 1`,
			style: {
				text: 'Same as zone 1\\n',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'source',
							options: {
								zone: 'Z2',
								source: 'SOURCE',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.z3sameAsZ1 = {
			type: 'button',
			category: 'Zone 3 Sources',
			name: `Same as Zone 1`,
			style: {
				text: 'Same as zone 1\\n',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'source',
							options: {
								zone: 'Z3',
								source: 'SOURCE',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		this.setPresetDefinitions(presets)
	},
}
