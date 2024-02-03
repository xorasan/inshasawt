+include managed.css.slang

#inshasawtui
	padding-top		20px
	padding-bottom	20px
.maktabitem
	position			relative
	border				1px solid @secondaryd
	border-radius		5px
.maktabitem[data-selected]
	background			@primaryl
	border-color		@accentd
.maktabitem .jumlah
	text-shadow		0 0 3px @primary
	z-index			1
	background		@primaryxt
	text-align		center
	border			0
.maktabitem .canvas
	-position		absolute
	-top			5px
	z-index			0
.haalah
	background			@primaryt
	z-index				20
