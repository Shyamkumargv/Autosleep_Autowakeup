## Autosleep-Autowakeup

This application does the following:

Wakeup Functionality
----------------------------
Expose an end-point (Root URL should have the wake-up logic)

	• Extract the App Name from the Request URL
	• Get the GUID for the Apps
	• For those Apps invoke start
	• Remove the route from the Autowake up app

Stop Functionality
------------------------
	• Build a Scheduler
	• Stop App applications in the Org
	• Add stopped app's route to the Autowakeup app

