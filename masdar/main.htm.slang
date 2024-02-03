+htm
body
	+include managed.htm.slang
	
	[view=main] #inshasawtui
		.pad .padv .haalah .sticky .top
			.flex
				b .pad 'Server:'
				.dim [id=selected_server]
			.flex
				b .pad 'Language:'
				.dim [id=selected_language]
			.flex
				b .pad 'Voice:'
				.dim [id=selected_voice]
			.flex
				b .pad 'Speaker:'
				.dim [id=selected_speaker]
		canvas .canvas [id=canvas] @max(480) @hidden
		[id=list]

	[sheet=voices]
		[id=list]

	[sheet=speakers]
		[id=list]

	[sheet=languages]
		[id=list]

	[sheet=servers]
		[id=list]

	[template=choice] .flex .listitem
		[id=name] .pad .bold .big
		[id=gender] .pad

	[template=voiceitem] .maktabitem
		.pad .padv
			.flex
				textarea .jumlah [id=jumlah]
				.waqt [id=waqt]
			.flex
				.sawtstr .dim [id=sawtstr] .grow
				.vocostr .dim [id=vocostr]
			canvas .canvas [id=canvas] @height(48)
