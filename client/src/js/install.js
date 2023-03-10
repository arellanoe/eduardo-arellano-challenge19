const btnInstall = document.getElementById('button-install');

window.addEventListener('beforeinstallprompt', (event) => {
	// Store the event for later use
	window.deferredPrompt = event;

	// Show the install button
	btnInstall.classList.add('visible');
});

btnInstall.addEventListener('click', async () => {
	// Get the deferred prompt event
	const promptEvent = window.deferredPrompt;

	if (!promptEvent) {
		return;
	}

	// Show the install prompt
	promptEvent.prompt();

	// Wait for the user to respond to the prompt
	const choiceResult = await promptEvent.userChoice;

	if (choiceResult.outcome === 'accepted') {
		console.log('User accepted the install prompt.');
	} else {
		console.log('User dismissed the install prompt.');
	}

	// Reset the deferred prompt variable
	window.deferredPrompt = null;

	// Hide the install button
	btnInstall.classList.remove('visible');
});

window.addEventListener('appinstalled', () => {
	// Clear the deferred prompt variable
	window.deferredPrompt = null;
});
