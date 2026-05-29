import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import record from './record'
/**
* @see \App\Http\Controllers\PsychologistAppointmentController::complete
* @see app/Http/Controllers/PsychologistAppointmentController.php:55
* @route '/psychologist/appointments/{appointment}/complete'
*/
export const complete = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: complete.url(args, options),
    method: 'patch',
})

complete.definition = {
    methods: ["patch"],
    url: '/psychologist/appointments/{appointment}/complete',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::complete
* @see app/Http/Controllers/PsychologistAppointmentController.php:55
* @route '/psychologist/appointments/{appointment}/complete'
*/
complete.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { appointment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        appointment: typeof args.appointment === 'object'
        ? args.appointment.id
        : args.appointment,
    }

    return complete.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::complete
* @see app/Http/Controllers/PsychologistAppointmentController.php:55
* @route '/psychologist/appointments/{appointment}/complete'
*/
complete.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: complete.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::complete
* @see app/Http/Controllers/PsychologistAppointmentController.php:55
* @route '/psychologist/appointments/{appointment}/complete'
*/
const completeForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::complete
* @see app/Http/Controllers/PsychologistAppointmentController.php:55
* @route '/psychologist/appointments/{appointment}/complete'
*/
completeForm.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

complete.form = completeForm

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::start
* @see app/Http/Controllers/PsychologistAppointmentController.php:78
* @route '/psychologist/appointments/{appointment}/start'
*/
export const start = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: start.url(args, options),
    method: 'patch',
})

start.definition = {
    methods: ["patch"],
    url: '/psychologist/appointments/{appointment}/start',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::start
* @see app/Http/Controllers/PsychologistAppointmentController.php:78
* @route '/psychologist/appointments/{appointment}/start'
*/
start.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { appointment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        appointment: typeof args.appointment === 'object'
        ? args.appointment.id
        : args.appointment,
    }

    return start.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::start
* @see app/Http/Controllers/PsychologistAppointmentController.php:78
* @route '/psychologist/appointments/{appointment}/start'
*/
start.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: start.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::start
* @see app/Http/Controllers/PsychologistAppointmentController.php:78
* @route '/psychologist/appointments/{appointment}/start'
*/
const startForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: start.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::start
* @see app/Http/Controllers/PsychologistAppointmentController.php:78
* @route '/psychologist/appointments/{appointment}/start'
*/
startForm.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: start.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

start.form = startForm

const appointments = {
    complete: Object.assign(complete, complete),
    start: Object.assign(start, start),
    record: Object.assign(record, record),
}

export default appointments