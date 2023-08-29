
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../firebase";



const millisecondsInDay = 86400000;

export const PlanOut2 = (gaps, generatedBreaks, originalTasks) => {
	//this function looks like it needs to be broken up into smaller functions
	let amountOfDaysInScope = 7
	let timeAvailable = new Array(amountOfDaysInScope-1)
	timeAvailable.forEach((element, index) => {
		element = getTimeAvailable(index)
	});

	let gaps_scope = []
    //new Array(7)

    const q = query(collection(firestore, "Planning"), where("day", "==", 0));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    // });

    getDocs(q).then((doc) => {
		// setTasks(doc.data().tasks);
		// setSync(true);
	}).catch((e) => {
		console.log(e);
		//throw e;
		//alert(error.message);
	});

    if (gaps_scope.length<=0){return;}

    // console.log([12, 5, 8, 130, 44].filter(value => value >= 10));

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
		days.forEach(day => {
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

function getPlannedHours( gaps_scope, date1, date2 ) {
	//load gaps from database under a new variable name
	//dates in milliseconds
	//dates in milliseconds
	let day1 = dayOf( date1 )
	let day2 = dayOf( date2 )
	if ( day1 == day2 ) { return getPlannedHoursDay( gaps_scope[day1], date1, date2 ); }
	let time = 0
	time += getPlannedHoursDay( gaps_scope[day1], date1, endOfDay(day1) );
	for (let day=day1+1; day<=day2-1; day++) {
		time += getPlannedHoursDay( gaps_scope[day], startOfDay(day), endOfDay(day) );
	}
	time += getPlannedHoursDay( gaps_scope[day2], startOfDay(day2) , date2 );
	return time
}

function dayOf( date ) {
	return date / millisecondsInDay
}

function endOfDay( day ) {
	return (day+1) * millisecondsInDay - 1
}

function startOfDay( day ) {
	return day * millisecondsInDay
}

function getPlannedHoursDay( gaps, date1, date2 ) {
	//dates in milliseconds since epoch
	// let time = 0;
    // console.log ("isGaps: ", gaps)
	return gaps.filter( gap => gap.startTime >= date1 && gap.startTime+gap.duration <= date2 )
		// .forEach( gap => time += gap.duration );
		.reduce((accumulator, gap) => accumulator + gap.duration, 0);

	// let index1 = gaps.indexOf( gaps.find( (gap) => gap.startTime >= date1 ) );
	// let index2 = gaps.indexOf( gaps.find( (gap) => gap.startTime + gap.duration >= date2 ) );
	// for (i = index1; i<=index2; i++) {

	// }
	// return time;
}


// function getPlannedHoursFullDay( gaps, date1, date2 ) {
// 	//dates in milliseconds
// 	let time = 0

// 	return time
// }