﻿<!Document HTML>
<html>
	<head>
		<meta charset="utf-8">
		<link href='http://fonts.googleapis.com/css?family=Nova+Square' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="mazesstyle.css">
		<title>fMaze</title>
	<head>
	<body id="corpo">
        <div class='black'></div>
        <div class='fMaze'><h1 class='fMaze-text'>Mazes</h1><h5>By: Filipe Moreira</h5></div>
        <p>This is a maze generator mini game created as part of<br> the Authistic Children Supportive project ADACA.<br>
        	The algorithm was made by me and it generates<br>random mazes of any size.<br>Use the arrow keys to play.</p>
        <div id='HUD'><strong>Level</strong> <span id='level'>1</span></div>

		<div class='labirinto' id='labirinto'>
            <div class='escuro'></div>
            <div class='luz'></div>
			<div class='jogador'></div>
			<div class='fim'></div>
		</div>
        <div id="bttDark">Escurecer</div>
		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="swipeupdown.js"></script>
		<script type="text/javascript" src="multiplos.js"></script>
        <script type="text/javascript" src="solucionador.js"></script>
        <script type="text/javascript" src="main.js"></script>
		<script type="text/javascript" src="maze_generator.js"></script>
	</body>
</html>