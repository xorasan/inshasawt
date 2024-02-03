//+
/*
 * TODO, gen a K.sl based [sheet] list() menu, adaaf it to mudeer as jadwal
 * */
var inshasawt, aswaatlist, cnvs, voices, downloaded = [], languages = [];
;(function(){
	'use strict';

	var speaker_names = {
		'ED\n': 'F',
		'p225': 'F better',
		'p226': 'M cracky medium',
		'p227': 'F better',
		'p228': 'M heavy',
		'p229': 'M slow medium',
		'p230': 'M dry medium gravely',
		'p231': 'M medium nasaly ugly',
		'p232': 'M breathy heavy relaxed',
		'p233': 'M indian medium',
		'p234': 'M english brit posh medium',
		'p236': 'M cracky neutral',
		'p237': 'F smooth soft',
		'p238': 'M medium',
		'p239': 'M high ugly posh',
		'p240': 'F ugly',
		'p253': 'M slow cracky',
		'p254': 'M slow cracky heavy LQ',
		'p255': 'M slow posh highish better',
		'p256': 'M fast medium',
		'p257': 'M fem',
		'p258': 'M slow heavy',
		'p259': 'F young smooth',
		'p260': 'F normal medium',
		'p261': 'F cracky',
		'p262': 'M near heavy',
		'p263': 'F',
		'p264': 'M indian',
		'p265': 'M ugly',
		'p266': 'M young',
		'p267': 'M oldish heavy',
		'p268': 'F',
		'p269': 'M medium',
	};
	
	var la3ib, audio, mfateeh, vocoders = [], macgool = 0,

	selected_language = 'en', settings_tts_language = 'settings_tts_language', settings_tts_language_uid,
	selected_voice = 0, settings_tts_voice = 'settings_tts_voice', settings_tts_voice_uid,
	selected_speaker = 0, settings_tts_speaker = 'settings_tts_speaker', settings_tts_speaker_uid,
	selected_server = 'http://localhost:5002/', settings_tts_server = 'settings_tts_server', settings_tts_server_uid,


	resize = function () {
		aswaatlist.adapter.each(function (c) {
			var m = aswaatlist.axavmfateeh(c.uid);
			if (m) {
				attribute(m.canvas, 'width', m.jumlah.clientWidth+'px');
				if (c.audio && c.audio.src)
					sawthafr.drawaudio(m.canvas, c.audio.src);
			}
		});
	},
	open = function () {
		fetch('script.txt').then(function (e) {
			e.text().then(function (v) {
				inshasawt.adaafmatn(v);
				webapp.itlaa3('opened');
			});
		});
	},
	save = function () {
		var str = '';
		
		aswaatlist.adapter.each(function (c) {
			if (str.length) str += '\n';
			str += c.jumlah;
		});

		if (str.length)
			Files.set.file('manaashir/script.txt', str.trim());
			
		webapp.itlaa3('saved');
	},
	redownload_button = function () {
		softkeys.set(K.en, function () {
			inshasawt.inqata3();
			inshasawt.ihmal(1);
		}, 0, 'XPO.iconrefresh');
	},
	stopbtn = function (sinf) {
		softkeys.set(K.sl, function () {
			la3ib = 2;
			if (sinf) inshasawt.inqata3();
			else inshasawt.ihmal();
		}, 0, sinf ? 'XPO.iconstop' : 'XPO.iconplaylistplay');
	},
	update_condition = function () {
		innertext(mfateeh.XPO.selected_server, selected_server);
		innertext(mfateeh.XPO.selected_language, selected_language);
		var total_voices = Object.keys(voices||{}).length;
		innertext(mfateeh.XPO.selected_voice, selected_voice + ' ( ' + total_voices + ' total ) ');

		var total_speakers = 'Default';
		if (voices && voices[selected_voice] && voices[selected_voice].speakers) {
			total_speakers = selected_speaker + ' ' + (speaker_names[selected_speaker] || '')
			+ ' ( ' + Object.keys(voices[selected_voice].speakers).length + ' total ) ';
		}
		innertext(mfateeh.XPO.selected_speaker, total_speakers);
	};
	
	inshasawt = {
		adaafmatn: function (str) {
			aswaatlist.popall();
			if (str && str.length) {
				str.split('\n').forEach(function (c, e) {
					aswaatlist.set({
						jumlah: c,
					});
				});;
				aswaatlist.select();
				aswaatlist.intaxabsaamitan();
				resize();
				redownload_button();
			}
		},
		inqata3: function () {
			la3ib = 0;
			audio && audio.pause();
			stopbtn();
		},
		select_server: function () { // TODO this should be available as a single generic global function searchable
			var selected;
			Hooks.run('XPO.sheet', {
				n: 'XPO.servers',
				t: 'TTS Server',
				i: function (keys) {
					var l = list(keys.XPO.list).idprefix('XPO.servers').listitem('XPO.choice');
					softkeys.list.basic(l);
					['http://localhost:5002/', 'http://104.11.156.4:5002/'].forEach(function (o, i) {
						l.set({
							name: o,
						});
						if (o == selected_server) l.select(i);
					});
					l.onpress = function (o, k) {
						selected = o.name;
						if (k == K.en) sheet.okay();
					};
				},
				c: function () {
					if (selected) {
						selected_server = selected;
						preferences.set(settings_tts_server, selected);
						settings.jaddad(settings_tts_server_uid);
					}
				},
			});
		},
		select_language: function () {
			var selected;
			Hooks.run('XPO.sheet', {
				n: 'XPO.languages',
				t: 'TTS Language',
				i: function (keys) {
					var l = list(keys.XPO.list).idprefix('XPO.languages').listitem('XPO.choice');
					softkeys.list.basic(l);
					languages.forEach(function (o, i) {
						o && l.set({
							name: o,
						});
						if (selected_language == o) l.select(i);
					});
					l.onpress = function (item, key) {
						selected = item.name;
						if (key == K.en) {
							sheet.okay();
						}
					};
				},
				c: function () {
					if (selected) {
						selected_language = selected;
						preferences.set(settings_tts_language, selected);
						settings.jaddad(settings_tts_language_uid);
					}
				},
			});
		},
		select_voice: function () {
			var selected;
			Hooks.run('XPO.sheet', {
				n: 'XPO.voices',
				t: 'TTS Voice',
				i: function (keys) {
					var l = list(keys.XPO.list).idprefix('XPO.voices').listitem('XPO.choice');
					softkeys.list.basic(l);
					downloaded.forEach(function (o, i) {
						o = voices[o];
						o && l.set({
							uid: o.id,
							name: o.name,
							gender: o.gender,
							language: o.language,
							locale: o.locale,
							tts_name: o.tts_name,
						});
						if (o.tts_name+':'+o.id == selected_voice) l.select(i);
					});
					l.onpress = function (o, k) {
						selected = o.tts_name+':'+o.uid;
						if (k == K.en) {
							sheet.okay();
						}
					};
				},
				c: function () {
					if (selected) {
						selected_voice = selected;
						preferences.set(settings_tts_voice, selected);
						settings.jaddad(settings_tts_voice_uid);
					}
				},
			});
		},
		select_speaker: function () {
			var selected;
			Hooks.run('XPO.sheet', {
				n: 'XPO.speakers',
				t: 'TTS Speaker',
				i: function (keys) {
					var l = list(keys.XPO.list).idprefix('XPO.speakers').listitem('XPO.choice');
					softkeys.list.basic(l);
					var voice = voices[selected_voice];
					if (selected_voice && voice && voice.speakers) {
						var i = 0;
						for (var sp in voice.speakers) {
							var o = voice.speakers;
							if (o) {
								l.set({
									uid: o[sp],
									name: sp,
									gender: speaker_names[sp],
								});
								if (sp == selected_speaker) l.select(i);
								++i;
							}
						}
					}
					l.onpress = function (o, k) {
						selected = o.name;
						if (k == K.en) {
							sheet.okay();
						}
					};
				},
				c: function () {
					if (selected) {
						selected_speaker = selected;
						preferences.set(settings_tts_speaker, selected);
						settings.jaddad(settings_tts_speaker_uid);
					}
				},
			});
		},
		il3ab: function (once) {
			audio && audio.pause();
			var c = aswaatlist.axavmuntaxab();
			if (c) {
				audio = c.audio;
			}
			if (audio) {
				audio.currentTime = 0;
				audio.onended = function () {
					// has more items and has finished downloading
					if (aswaatlist.selected+1 < aswaatlist.length() && la3ib == 2 && !once) {
						aswaatlist.down();
						inshasawt.ihmal();
					} else {
						stopbtn();
					}
				};
				audio.play();
				stopbtn(1);
			}
		},
		ihmalkul: function () {
			webapp.itlaa3('saving...');
			var uid = 0, q = $.queue();
			aswaatlist.adapter.each(function (c, e) {
				if (c.blob) {
					q.set(function (done) {
						webapp.itlaa3('saving ('+ zero( uid ) +')...');
						c.blob.arrayBuffer().then(function (arrbuf) {
							Files.set.file(
								'Exports/voice-'+zero( uid )+'.wav',
								Buffer.from( arrbuf )
							);
							uid++;
							done(q);
						});
					});
				}
			});
			q.run(function () {
				if (uid)
				webapp.itlaa3('saved!');
				else
				webapp.itlaa3('nothing to save.');
			});
		},
		adaaf: function () {
			var c = aswaatlist.set({ jumlah: '' });
			var uid = getdata(c, 'uid');
			aswaatlist.select( aswaatlist.id2num(uid) );
			aswaatlist.intaxabsaamitan();
			redownload_button();
		},
		ihmal: function (redo) {
			// add an item if none exist
			if (!aswaatlist.length() || !voices) inshasawt.adaaf();
			
			if (macgool) return;
			
			var c = aswaatlist.axavmuntaxab();
			if (c.audio && !redo) {
				inshasawt.il3ab(); return;
			}

			var m = aswaatlist.axavmfateeh(c.uid);
			var jumlah = c.jumlah.trim();
			var startTime = performance.now();
			if (getSelection().toString().trim().length) {
				jumlah = '_ '+getSelection().toString()+' _';
			}
			
			if (jumlah.length) {
				jumlah = enc(jumlah);
				macgool = 1;
				innertext(m.waqt, '...');
				
				var speaker_uri_part = '';
				if (voices[selected_voice] && voices[selected_voice].speakers) {
					if (voices[selected_voice].speakers[selected_speaker]) {
						speaker_uri_part = '&speakerId='+enc(selected_speaker);
					}
				}
				
				fetch(
					selected_server+'api/tts?voice='+selected_voice+'&text='+jumlah+
//					'&vocoder=' + enc(vocoder.id) +
					speaker_uri_part +
//					'&denoiserStrength=' + enc(denoiserStrength) +
//					'&noiseScale=' + enc(noiseScale) +
//					'&lengthScale=' + enc(lengthScale) +
					'&ssml=' + 0
				).then(function (res) {
					if (res.ok) {
						res.blob().then(function (b) {
							var elapsedTime = performance.now() - startTime;
							innertext(m.waqt, parsefloat(elapsedTime/1000, 1)+'s');
							audio && audio.pause();
							audio = c.audio = new Audio();
							c.blob = b;
							var url = audio.src = URL.createObjectURL(b);
							sawthafr.drawaudio(m.canvas, url);
							inshasawt.il3ab();
						});
					} else {
						res.text().then(function (str) {
							webapp.itlaa3('error: '+str);
						});
					}
				}).finally(function () {
					macgool = 0;
				});
			}
		}
	};

	listener('resize', function () {
		$.taxeer('XPO.resizeinshasawt', function () { resize(); }, 100);
	});
	Hooks.set('XPO.ready', function () {
		webapp.statusbarpadding();
		webapp.bixraaj(1);
		mfateeh = view.dom_keys('XPO.main');

		// TODO a convenience function to automate this settings mess below

		if (preferences) {
			selected_language	= preferences.get(settings_tts_language) || 'en'	;
			selected_voice		= preferences.get(settings_tts_voice)				;
			selected_server		= preferences.get(settings_tts_server)	|| selected_server;
			selected_speaker	= preferences.get(settings_tts_speaker)				;
		}
		
		settings_tts_voice_uid = settings.adaaf('TTS Voice', function () {
			update_condition();
			return preferences.get(settings_tts_voice);
		}, function () {
			inshasawt.select_voice();
		}, 'XPO.iconrecordvoiceover');

		settings_tts_server_uid = settings.adaaf('TTS Server', function () {
			update_condition();
			return preferences.get(settings_tts_server) || selected_server;
		}, function () {
			inshasawt.select_server();
		}, 'XPO.iconweb');

		settings_tts_language_uid = settings.adaaf('TTS Language', function () {
			update_condition();
			return preferences.get(settings_tts_language) || 'en';
		}, function () {
			inshasawt.select_language();
		}, 'XPO.iconlanguage');

		settings_tts_speaker_uid = settings.adaaf('TTS Speaker', function () {
			update_condition();
			return preferences.get(settings_tts_speaker);
		}, function () {
			inshasawt.select_speaker();
		});

		aswaatlist = list( mfateeh.XPO.list ).idprefix('XPO.voice').listitem('XPO.voiceitem');
		aswaatlist.afterset = function (o, c, m) {
			m.jumlah.onprev = function () {
				aswaatlist.up();
			};
			m.jumlah.onnext = function () {
				aswaatlist.down();
			};
			m.jumlah.uponshiftenter = function () {
				inshasawt.adaaf();
			};
			m.jumlah.oninput = function () {
				o.jumlah = m.jumlah.value.trim();
			};
			softkeys.autoheight(m.jumlah);
			redownload_button();
		};
		aswaatlist.uponpaststart =
		aswaatlist.uponpastend = function () { return 1; };

		fetch( selected_server+'api/voices' ).then(function (res) {
			if (res.ok) {
				res.json().then(function (b) {
					voices = b;
					for (var i in voices) {
						var v = voices[i];
						if (/*v.downloaded && */!downloaded.includes(v.id))
							downloaded.push(i);
					}
					settings.jaddad(settings_tts_voice_uid);
				});
			} else {
				webapp.itlaa3('error fetching voices');
			}
		});
		fetch( selected_server+'api/languages' ).then(function (res) {
			if (res.ok) {
				res.json().then(function (b) {
					languages = b;
					settings.jaddad(settings_tts_language_uid);
				});
			} else {
				webapp.itlaa3('error fetching languages');
			}
		});

		aswaatlist.on_selection = function (c) {
			var m = aswaatlist.axavmfateeh( c.uid );
			m.jumlah.focus();
			redownload_button();
		};

		open();
		resize();
		update_condition();
	});
	Hooks.set('XPO.viewready', function (args) {
		switch (args.XPO.name) {
			case 'XPO.main':
				webapp.header();
				aswaatlist.select();
				aswaatlist.intaxabsaamitan();

				softkeys.add({ n: 'Select Server',
					alt: 1,
					k: '1',
					i: 'XPO.iconweb',
					c: function () {
						inshasawt.select_server();
					}
				});
				softkeys.add({ n: 'Select Language',
					alt: 1,
					k: '2',
					i: 'XPO.iconlanguage',
					c: function () {
						inshasawt.select_language();
					}
				});
				softkeys.add({ n: 'Select Voice',
					alt: 1,
					k: '3',
					i: 'XPO.iconkeyboardvoice',
					c: function () {
						inshasawt.select_voice();
					}
				});
				softkeys.add({ n: 'Select Speaker',
					alt: 1,
					k: '4',
					i: 'XPO.iconrecordvoiceover',
					c: function () {
						inshasawt.select_speaker();
					}
				});

				softkeys.add({ n: 'Download All Audio Files',
					alt: 1,
					k: 'd',
					i: 'XPO.iconfiledownload',
					c: function () {
						inshasawt.ihmalkul();
					}
				});
				softkeys.add({ n: 'Save Text',
					ctrl: 1,
					k: 's',
					i: 'XPO.iconsave',
					c: function () {
						save();
					}
				});
				softkeys.add({ n: 'Open Text',
					ctrl: 1,
					k: 'o',
					i: 'XPO.iconfolderopen',
					c: function () {
						open();
					}
				});
				softkeys.add({ n: 'Previous Speaker',
					alt: 1,
					k: 'z',
					i: 'XPO.iconarrowback',
					c: function () {
						if (voices && voices[selected_voice] && voices[selected_voice].speakers) {
							var speakers = voices[selected_voice].speakers;
							var keys = Object.keys(speakers);
							var index = keys.indexOf(selected_speaker) - 1;
							if (index >= 0) {
								selected_speaker = keys[index];
								preferences.set(settings_tts_speaker, selected_speaker);
								settings.jaddad(settings_tts_speaker_uid);
							}
						}
//						var c = aswaatlist.axavmuntaxab();
//						if (isundef(c.voice)) c.voice = -1;
//						c.voice++;
//						if (c.voice >= downloaded.length) c.voice = undefined;
//						c.sawtstr = downloaded[c.voice] || '';
//						aswaatlist.set(c);
//						aswaatlist.intaxabsaamitan();
					}
				});
				softkeys.add({ n: 'Next Speaker',
					alt: 1,
					k: 'x',
					i: 'XPO.iconarrowforward',
					c: function () {
						if (voices && voices[selected_voice] && voices[selected_voice].speakers) {
							var speakers = voices[selected_voice].speakers;
							var keys = Object.keys(speakers);
							var index = keys.indexOf(selected_speaker) + 1;
							if (index < keys.length) {
								selected_speaker = keys[index];
								preferences.set(settings_tts_speaker, selected_speaker);
								settings.jaddad(settings_tts_speaker_uid);
							}
						}
//						var c = aswaatlist.axavmuntaxab();
//						if (isundef(c.vocoder)) c.vocoder = -1;
//						c.vocoder++;
//						if (c.vocoder >= vocoders.length) c.vocoder = undefined;
//						if (vocoders[c.vocoder])
//							c.vocostr = vocoders[c.vocoder].id;
//						else
//							c.vocostr = '';
//						aswaatlist.set(c);
//						aswaatlist.intaxabsaamitan();
					}
				});

				softkeys.add({ n: 'Delete',
					alt: 1,
					k: 'delete',
					i: 'XPO.icondelete',
					c: function () {
						aswaatlist.pop();
//						aswaatlist.select( );
						aswaatlist.intaxabsaamitan();
					}
				});
				softkeys.add({ n: 'Play',
					alt: 1,
					k: 'p',
					i: 'XPO.iconplayarrow',
					c: function () {
						inshasawt.il3ab(1);
					}
				});

				redownload_button();
				stopbtn();
				break;
		}
	});
})();
