var instance_skel = require('../../instance_skel');
var tcp = require('../../tcp');
var debug;
var log;

function instance(system, id, config) {
		var self = this;

		// super-constructor
		instance_skel.apply(this, arguments);
		self.actions(); // export actions
		return self;
}

instance.prototype.init = function () {
		var self = this;

		debug = self.debug;
		log = self.log;

		self.status(self.STATUS_UNKNOWN);

		if (self.config.host !== undefined) {
			self.tcp = new tcp(self.config.host, 23);

			self.tcp.on('status_change', function (status, message) {
				self.status(status, message);
			});

			self.tcp.on('error', function () {
				// Ignore
			});
		}
		
};

instance.prototype.updateConfig = function (config) {
		var self = this;
		self.config = config;

		if (self.tcp !== undefined) {
			self.tcp.destroy();
			delete self.tcp;
		}

		if (self.config.host !== undefined) {
			self.tcp = new tcp(self.config.host, 23);

			self.tcp.on('status_change', function (status, message) {
				self.status(status, message);
			});

			self.tcp.on('error', function (message) {
				// ignore for now
			});
		}
};

// Return config fields for web config
instance.prototype.config_fields = function () {
		var self = this;
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module is for Denon AV Receivers'
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 6,
				default: '192.168.0.100',
				regex: self.REGEX_IP
			}
		]
};

// When module gets deleted
instance.prototype.destroy = function () {
	var self = this;

		if (self.tcp !== undefined) {
			self.tcp.destroy();
		}
		debug("destroy", self.id);
};

instance.prototype.CHOICES_SOURCES = [
	{ label: 'PHONO', id: 'SIPHONO' },
	{ label: 'CD', id: 'SICD' },
	{ label: 'TUNER', id: 'SITUNER' },
	{ label: 'DVD', id: 'SIDVD' },
	{ label: 'BluRay', id: 'SIBD' },
	{ label: 'HDP', id: 'SIHDP' },
	{ label: 'TV', id: 'SITV' },
	{ label: 'TV/CBL', id: 'SITV/CBL' },
	{ label: 'SAT/CBL', id: 'SISAT/CBL' },
	{ label: 'SAT', id: 'SISAT' },
	{ label: 'Media Player', id: 'SIMPLAY' },
	{ label: 'Game', id: 'SIGAME' },
	{ label: 'HD Radio', id: 'SIHDRADIO' },
	{ label: 'NET/Online', id: 'SINET' },
	{ label: 'Pandora', id: 'SIPANDORA' },
	{ label: 'SiriusXM', id: 'SISIRIUSXM' },
	{ label: 'Spotify', id: 'SISPOTIFY' },
	{ label: 'LastFM', id: 'SILASTFM' },
	{ label: 'Flickr', id: 'SIFLICKR' },
	{ label: 'iRadio', id: 'SIIRADIO' },
	{ label: 'Server', id: 'SISERVER' },
	{ label: 'Favorites', id: 'SIFAVORITES' },
	{ label: 'VCR', id: 'SIVCR' },
	{ label: 'DVR', id: 'SIDVR' },
	{ label: 'V.AUX', id: 'SIV.AUX' },
	{ label: 'Aux1', id: 'SIAUX1' },
	{ label: 'Aux2', id: 'SIAUX2' },
	{ label: 'Aux3', id: 'SIAUX3' },
	{ label: 'Aux4', id: 'SIAUX4' },
	{ label: 'Bluetooth', id: 'SIBT' },
	{ label: 'NET/USB', id: 'SINET/USB' },
	{ label: 'XM', id: 'SIXM' },
	{ label: 'IPOD', id: 'SIIPOD' }
];

	

instance.prototype.actions = function (system) {
	var self = this;

	CHOICES_VOLUME = [];

		for(i = 98; i >=1; i--) {
			db = i - 80;
			v = String(i).padStart(2,"0");
			CHOICES_VOLUME.push({ label:  db +'dB', id: '' + v + ''});
		 }

	CHOICES_VOLUME.push({ label: 'Mute', id: '00'});
	console.log(CHOICES_VOLUME);

	var actions = {
		'power': {
			label: 'Power control',
			options: [{
				type: 'dropdown',
				label: 'on/standby',
				id: 'power',
				default: 'power_on',
				choices: [
					{ label: 'Power on', id: 'power_on' },
					{ label: 'standby', id: 'power_off' },
					{ label: 'Zone2 on', id: 'Z2_on' },
					{ label: 'Zone2 off', id: 'Z2_off' },
					{ label: 'Zone3 on', id: 'Z3_on' },
					{ label: 'Zone3 off', id: 'Z3_off' }
				]
			}]
		},
		'mute': {
			label: 'mute',
			options: [{
				type: 'dropdown',
				label: 'on/off',
				id: 'mute',
				default: 'mute_on',
				choices: [{ label: 'Mute on', id: 'mute_on' }, { label: 'mute off', id: 'mute_off' }]
			}]
		},
		'volume': {
			label: 'volume',
			options: [{
				type: 'dropdown',
				label: 'up/down',
				id: 'volume',
				default: 'volume_up',
				choices: [{ label: 'Volume up', id: 'volume_up' }, { label: 'Volume down', id: 'volume_down' }]
			}/*,{
				type: 'textinput',
				label: 'dB',
				id: 'dBvalue',
				default: '6',
				regex: self.REGEX_NUMBER
			}*/]
		},
		'set_volume': {
			label: 'set volume',
			options: [{
				type: 'dropdown',
				label: 'Set volume level',
				id: 'set_volume',
				default: '00',
				choices: CHOICES_VOLUME
			}]
		},
		'source': {
			label: 'Source selection',
			options: [{
				type: 'dropdown',
				label: 'Switch to source',
				id: 'source',
				default: 'SIDVD',
				choices: self.CHOICES_SOURCES
			}]
		},
		'surround': {
			label: 'Surround mode selection',
			options: [{
				type: 'dropdown',
				label: 'Select Surround mode',
				id: 'surround',
				default: 'MSAUTO',
				choices: [
					{ label: 'Movie', id: 'MSMOVIE'},
					{ label: 'Music', id: 'MSMUSIC'},
					{ label: 'Game', id: 'MSGAME'},
					{ label: 'Direct', id: 'MSDIRECT'},
					{ label: 'Pure Direct', id: 'MSPURE DIRECT'},
					{ label: 'Stereo', id: 'MSSTEREO'},
					{ label: 'Auto', id: 'MSAUTO'},
					{ label: 'Dolby Digital', id: 'MSDOLBY DIGITAL'},
					{ label: 'DTS Surround', id: 'MSDTS SURROUND'}
				]
			}]	
		},
		'navigate' : {
			label: 'Menu Navigation Controls',
			options: [{
				type: 'dropdown',
				label: 'Select Control',
				id: 'navigate',
				default: 'MNENT',
				choices: [
					{ label: 'up', id: 'MNCUP'},
					{ label: 'down', id: 'MNCDN'},
					{ label: 'left', id: 'MNCLT'},
					{ label: 'right', id: 'MNCRT'},
					{ label: 'enter', id: 'MNENT'},
					{ label: 'return', id: 'MNRTN'},
					{ label: 'option', id: 'MNOPT'},
					{ label: 'info', id: 'MNINF'},
					{ label: 'setup menu on', id: 'MNMEN ON'},
					{ label: 'setuip menu off', id: 'MNMEN OFF'}
				]
			}]
		}
	};
		self.setActions(actions);
};


instance.prototype.action = function (action) {
	var self = this;
	var id = action.action;
	var opt = action.options;
	var cmd;

	switch (id) {

		case 'power':
			if (opt.power == 'power_on') {
				cmd = 'PWON\r';
			} else if (opt.power == 'power_off') {
				cmd = 'PWSTANDBY\r';
			} else if (opt.power == 'Z2_on') {
				cmd = 'Z2ON\r';
			} else if (opt.power == 'Z2_off') {
				cmd = 'Z2OFF\r';
			} else if (opt.power == 'Z3_on') {
				cmd = 'Z3ON\r';
			} else if (opt.power == 'Z3_off') {
				cmd = 'Z3OFF\r';
			}
			break

		case 'mute':
			if (opt.mute == 'mute_on') {
				cmd = 'MUON\r';
			} else if (opt.mute == 'mute_off') {
				cmd = 'MUOFF\r';
			}
			break

		case 'volume':
			if (opt.volume == 'volume_up') {
				cmd = 'MVUP\r';
			} else if (opt.volume == 'volume_down') {
				cmd = 'MVDOWN\r';
			}
			break
		
		case 'set_volume':
			cmd = "MV" + String(opt.set_volume).padStart( 2 , "0" ) + '\r';
			break

		case 'source':
			cmd = opt.source + '\r';
			break

		case 'surround':
			cmd = opt.surround + '\r';
			break

		case 'navigate':
			cmd = opt.navigate + '\r';
			break
	}

	if (cmd !== undefined) {
		if (self.tcp !== undefined) {
			debug('sending ', cmd, "to", self.tcp.host);
			self.tcp.send(cmd);
			console.log("Command Sent: " + cmd); 
		}
	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
