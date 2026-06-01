import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:15
* @route '/psychologist/appointments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/psychologist/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:15
* @route '/psychologist/appointments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:15
* @route '/psychologist/appointments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:15
* @route '/psychologist/appointments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:15
* @route '/psychologist/appointments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:15
* @route '/psychologist/appointments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:15
* @route '/psychologist/appointments'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::complete
* @see app/Http/Controllers/PsychologistAppointmentController.php:64
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
* @see app/Http/Controllers/PsychologistAppointmentController.php:64
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
* @see app/Http/Controllers/PsychologistAppointmentController.php:64
* @route '/psychologist/appointments/{appointment}/complete'
*/
complete.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: complete.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::complete
* @see app/Http/Controllers/PsychologistAppointmentController.php:64
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
* @see app/Http/Controllers/PsychologistAppointmentController.php:64
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
* @see app/Http/Controllers/PsychologistAppointmentController.php:95
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
* @see app/Http/Controllers/PsychologistAppointmentController.php:95
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
* @see app/Http/Controllers/PsychologistAppointmentController.php:95
* @route '/psychologist/appointments/{appointment}/start'
*/
start.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: start.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::start
* @see app/Http/Controllers/PsychologistAppointmentController.php:95
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
* @see app/Http/Controllers/PsychologistAppointmentController.php:95
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

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::updateRecord
* @see app/Http/Controllers/PsychologistAppointmentController.php:157
* @route '/psychologist/appointments/{appointment}/record'
*/
export const updateRecord = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateRecord.url(args, options),
    method: 'patch',
})

updateRecord.definition = {
    methods: ["patch"],
    url: '/psychologist/appointments/{appointment}/record',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::updateRecord
* @see app/Http/Controllers/PsychologistAppointmentController.php:157
* @route '/psychologist/appointments/{appointment}/record'
*/
updateRecord.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateRecord.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::updateRecord
* @see app/Http/Controllers/PsychologistAppointmentController.php:157
* @route '/psychologist/appointments/{appointment}/record'
*/
updateRecord.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateRecord.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::updateRecord
* @see app/Http/Controllers/PsychologistAppointmentController.php:157
* @route '/psychologist/appointments/{appointment}/record'
*/
const updateRecordForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRecord.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::updateRecord
* @see app/Http/Controllers/PsychologistAppointmentController.php:157
* @route '/psychologist/appointments/{appointment}/record'
*/
updateRecordForm.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRecord.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateRecord.form = updateRecordForm

const PsychologistAppointmentController = { index, complete, start, updateRecord }

export default PsychologistAppointmentController