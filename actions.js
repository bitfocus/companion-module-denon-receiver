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
	{ label: 'Same as zone 1', id: 'SOURCE' },
]

module.exports = function (self) {
	CHOICES_VOLUME = []

	for (i = 98; i >= 1; i--) {
		db = i - 80
		v = String(i).padStart(2, '0')
		CHOICES_VOLUME.push({ label: db + 'dB', id: '' + v + '' })
	}

	CHOICES_VOLUME.push({ label: 'Mute', id: '00' })

	self.setActionDefinitions({
		power: {
			name: 'Power control',
			options: [
				{
					type: 'dropdown',
					label: 'on/standby',
					id: 'power',
					default: 'PWON\r',
					choices: [
						{ label: 'Power on', id: 'PWON' },
						{ label: 'standby', id: 'PWSTANDBY' },
						{ label: 'Zone2 on', id: 'Z2ON' },
						{ label: 'Zone2 off', id: 'Z2OFF' },
						{ label: 'Zone3 on', id: 'Z3ON' },
						{ label: 'Zone3 off', id: 'Z3OFF' },
					],
				},
			],
			callback: async (event) => {
				var cmd = event.options.power + '\r'
				console.log('command sent to denon ->', cmd)
				self.socket.send(cmd)
			},
		},
		mute: {
			name: 'Mute controls',
			options: [
				{
					type: 'dropdown',
					label: 'zone/on/off',
					id: 'mute',
					default: 'MUON\r',
					choices: [
						{ label: 'Main zone mute on', id: 'MUON\r' },
						{ label: 'Main zone mute off', id: 'MUOFF\r' },
						{ label: 'Zone 2 mute on', id: 'Z2MUON\r' },
						{ label: 'Zone 2 mute off', id: 'Z2MUOFF\r' },
						{ label: 'Zone 3 mute on', id: 'Z3MUON\r' },
						{ label: 'Zone 3 mute off', id: 'Z3MUOFF\r' },
					],
				},
			],
			callback: async (event) => {
				var cmd = event.options.mute
				console.log('command sent to denon ->', cmd)
				self.socket.send(cmd)
			},
		},
		volume: {
			name: 'Volume',
			options: [
				{
					type: 'dropdown',
					label: 'zone/up/down',
					id: 'volume',
					default: 'volume_up',
					choices: [
						{ label: 'Main Zone volume up', id: 'MVUP' },
						{ label: 'Main Zone volume down', id: 'MVDOWN' },
						{ label: 'Zone 2 volume up', id: 'Z2UP' },
						{ label: 'Zone 2 volume down', id: 'Z2DOWN' },
						{ label: 'Zone 3 volume up', id: 'Z3UP' },
						{ label: 'Zone 3 volume down', id: 'Z3DOWN' },
					],
				},
			],
			callback: async (event) => {
				var cmd = event.options.volume + '\r'
				console.log('command sent to denon ->', cmd)
				self.socket.send(cmd)
			},
		},
		set_volume: {
			name: 'Set Volume',
			options: [
				{
					type: 'dropdown',
					label: 'select zone',
					id: 'zone',
					default: 'MV',
					choices: [
						{ label: 'Main Zone', id: 'MV' },
						{ label: 'Zone 2', id: 'Z2' },
						{ label: 'Zone 3', id: 'Z3' },
					],
				},
				{
					type: 'dropdown',
					id: 'set_volume',
					default: '00',
					choices: CHOICES_VOLUME,
				},
			],
			callback: async (event) => {
				var cmd = event.options.zone + String(event.options.set_volume).padStart(2, '0') + '\r'
				console.log('command sent to denon ->', cmd)
				self.socket.send(cmd)
			},
		},
		source: {
			name: 'Source selection',
			options: [
				{
					type: 'dropdown',
					label: 'select zone',
					id: 'zone',
					default: 'SI',
					choices: [
						{ label: 'Main Zone', id: 'SI' },
						{ label: 'Zone 2', id: 'Z2' },
						{ label: 'Zone 3', id: 'Z3' },
					],
				},
				{
					type: 'dropdown',
					label: 'select source',
					id: 'source',
					default: 'DVD',
					choices: CHOICES_SOURCES,
				},
			],
			callback: async (event) => {
				var cmd = event.options.zone + event.options.source + '\r'
				console.log('command sent to denon ->', cmd)
				self.socket.send(cmd)
			},
		},
		surround: {
			name: 'Surround mode selection',
			options: [
				{
					type: 'dropdown',
					label: 'Select surround mode',
					id: 'surround',
					default: 'MSAUTO',
					choices: [
						{ label: 'Movie', id: 'MSMOVIE' },
						{ label: 'Music', id: 'MSMUSIC' },
						{ label: 'Game', id: 'MSGAME' },
						{ label: 'Direct', id: 'MSDIRECT' },
						{ label: 'Pure Direct', id: 'MSPURE DIRECT' },
						{ label: 'Stereo', id: 'MSSTEREO' },
						{ label: 'Auto', id: 'MSAUTO' },
						{ label: 'Dolby Digital', id: 'MSDOLBY DIGITAL' },
						{ label: 'DTS Surround', id: 'MSDTS SURROUND' },
					],
				},
			],
			callback: async (event) => {
				var cmd = event.options.surround + '\r'
				console.log('command sent to denon ->', cmd)
				self.socket.send(cmd)
			},
		},
		navigate: {
			name: 'Menu navigation controls',
			options: [
				{
					type: 'dropdown',
					label: 'Select control',
					id: 'navigate',
					default: 'MNENT',
					choices: [
						{ label: 'up', id: 'MNCUP' },
						{ label: 'down', id: 'MNCDN' },
						{ label: 'left', id: 'MNCLT' },
						{ label: 'right', id: 'MNCRT' },
						{ label: 'enter', id: 'MNENT' },
						{ label: 'return', id: 'MNRTN' },
						{ label: 'option', id: 'MNOPT' },
						{ label: 'info', id: 'MNINF' },
						{ label: 'setup menu on', id: 'MNMEN ON' },
						{ label: 'setuip menu off', id: 'MNMEN OFF' },
					],
				},
			],
			callback: async (event) => {
				var cmd = event.options.navigate + '\r'
				console.log('command sent to denon ->', cmd)
				self.socket.send(cmd)
			},
		},
	})
}
