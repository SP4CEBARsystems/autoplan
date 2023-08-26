

export const PlanOut2 = (gaps, generatedBreaks, originalTasks) => {
	//this function looks like it needs to be broken up into smaller functions
	let amountOfDaysInScope = 7
	let timeAvailable = new Array(amountOfDaysInScope-1)
	timeAvailable.array.forEach((element, index) => {
		element = getTimeAvailable(index)
	});

	let gaps_scope = new array(7)
	//go load it from the database

	let days = new Array(amountOfDaysInScope-1)
	let tasks = originalTasks
	tasks.sort((a, b) => b.priority - a.priority)
	let hoursLeftToday  = getPlannedHoursLeftToday()
	let scopedHoursLeft = getScopedHoursLeft( hoursLeftToday )
	tasks.forEach(task => {
		let maxDaysToPlan = task.minDuration ? task.requiredTime / task.minDuration : Infinity
		if (maxDaysToPlan<1) {maxDaysToPlan=1}
		//infinity may cause things to malfunction
		let daysUntilDeadline1 = getDaysUntilDeadline()
		let daysUntilDeadline  = Math.min( maxDaysToPlan, daysUntilDeadline1 )
		let timeUntilDeadline  = getTimeUntilDeadline( gaps_scope, task, hoursLeftToday, scopedHoursLeft, daysUntilDeadline, amountOfDaysInScope )
		// display planningFactor as a percentage on the todo list

		let planningFactor = timeUntilDeadline ? task.requiredTime / timeUntilDeadline : 1
		// let averageDuration = task.requiredTime / daysUntilDeadline
		// if (task.requiredTime < task.minDuration) {
		// 	//( maxDaysToPlan < 1 )
		// 	//ignore something
		// }
		//what does this measure?
		//what does planningFactor measure? percentage (actually factor) of time until deadline that's dedicated to that task

		//min-duration
		//
		days.array.forEach(day => {
			day = planningFactor
			//I decided to just keep the percentages in this phase, but what if a 10 minute task is stretched over 7 days?
			//satisfy min-length
			//oh no, the most urgent task will fill up all time, leaving no time left for more urgent tasks, oh wait, the factor will be really low
			//don't care about min and max lengths for now, yes, short tasks will be cut in many pieces then

			//calculate a min-factor: days have to be reduced (from the start) until this factor is large enough
		});
		//   - This factor is then written to each day that's in scope
		//   - and checked for to do list parameters: a valid time section has to exceed min-length, and not exceed max-length 
		//   - This task is now (not) either:
		//     - going to be spread evenly over the day now in a way that it can't possibly get overwritten by later tasks 
		//       - (because the durations parameters of tasks may be different), 
		//     - or (definitely) all tasks are going to be chronologically planned in later
	});
}

function PlanOut2_Stage2(gaps, generatedBreaks, originalTasks){
	//percentage to minutes
}

function getTimeAvailable(index) {
	
}

function getDaysUntilDeadline() {

}

function getTimeUntilDeadline( gaps_scope, task, hoursLeftToday, scopedHoursLeft, daysUntilDeadline, amountOfDaysInScope ) {
	//time unit: milliseconds since epoch
	let now   = Date.now()
	let today = Math.ceil( now / millisecondsInDay )
	let scope = today + amountOfDaysInScope - 1
	if (task.deadline <  now  ) {return}
	// if (task.deadline <= today) {return getPlannedHours( now, deadline )}
	//return getPlannedHoursUntilDeadlineToday(task.deadline)
	if (task.deadline <= scope) {return getPlannedHours( gaps_scope, now, deadline )}
	//return hoursLeftToday + getScopedHoursUntilDeadline(task.deadline)
	return getPlannedHours( gaps_scope, now, scope ) + getUnscopedHours( scope, deadline )
	// return scopedHoursLeft + getUnscopedHoursUntilDeadline( scope, deadline )
}

function getUnscopedHours( date1, date2 ) {
	//averageUsefulTime =  take a look at the prepared array of time available in scope
	averageUsefulTime = 0.1
	return (date2 - date1) * averageUsefulTime
}



function getUnscopedHoursUntilDeadline( deadline ) {
	// return (unscoped days until potential deadline) * average amount of work per day
}

function getScopedHoursLeft( hoursLeftToday ) {
	return hoursLeftToday
}

function getScopedHoursUntilDeadline( deadline ) {

}

function getPlannedHoursUntilDeadlineToday( deadline ) {
}

function getPlannedHoursLeftToday() {
	//if (deadline today) {

	// } else {

	// }
}