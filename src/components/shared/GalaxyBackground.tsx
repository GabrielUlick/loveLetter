const GalaxyBackground = () => (
		<div className="galaxy-background" aria-hidden>
		{/* Soft drifting nebula clouds */}
		<div className="nebula-layer" />

		{/* Twinkling parallax starfields */}
			<div className="stars-1" />
			<div className="stars-2" />
			<div className="stars-3" />
			<div className="stars-4" />
			<div className="stars-5" />

		{/* Occasional shooting stars */}
		<div className="meteors">
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
		</div>
	</div>
);

export default GalaxyBackground;

