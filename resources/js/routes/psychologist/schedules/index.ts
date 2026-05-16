import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PsychologistScheduleController::index
* @see app/Http/Controllers/PsychologistScheduleController.php:13
* @route '/psychologist/schedules'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/psychologist/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsychologistScheduleController::index
* @see app/Http/Controllers/PsychologistScheduleController.php:13
* @route '/psychologist/schedules'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistScheduleController::index
* @see app/Http/Controllers/PsychologistScheduleController.php:13
* @route '/psychologist/schedules'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::index
* @see app/Http/Controllers/PsychologistScheduleController.php:13
* @route '/psychologist/schedules'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::index
* @see app/Http/Controllers/PsychologistScheduleController.php:13
* @route '/psychologist/schedules'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::index
* @see app/Http/Controllers/PsychologistScheduleController.php:13
* @route '/psychologist/schedules'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::index
* @see app/Http/Controllers/PsychologistScheduleController.php:13
* @route '/psychologist/schedules'
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
* @see \App\Http\Controllers\PsychologistScheduleController::store
* @see app/Http/Controllers/PsychologistScheduleController.php:51
* @route '/psychologist/schedules'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/psychologist/schedules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PsychologistScheduleController::store
* @see app/Http/Controllers/PsychologistScheduleController.php:51
* @route '/psychologist/schedules'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistScheduleController::store
* @see app/Http/Controllers/PsychologistScheduleController.php:51
* @route '/psychologist/schedules'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::store
* @see app/Http/Controllers/PsychologistScheduleController.php:51
* @route '/psychologist/schedules'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::store
* @see app/Http/Controllers/PsychologistScheduleController.php:51
* @route '/psychologist/schedules'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PsychologistScheduleController::update
* @see app/Http/Controllers/PsychologistScheduleController.php:77
* @route '/psychologist/schedules/{schedule}'
*/
export const update = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/psychologist/schedules/{schedule}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PsychologistScheduleController::update
* @see app/Http/Controllers/PsychologistScheduleController.php:77
* @route '/psychologist/schedules/{schedule}'
*/
update.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { schedule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            schedule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        schedule: typeof args.schedule === 'object'
        ? args.schedule.id
        : args.schedule,
    }

    return update.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistScheduleController::update
* @see app/Http/Controllers/PsychologistScheduleController.php:77
* @route '/psychologist/schedules/{schedule}'
*/
update.patch = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::update
* @see app/Http/Controllers/PsychologistScheduleController.php:77
* @route '/psychologist/schedules/{schedule}'
*/
const updateForm = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::update
* @see app/Http/Controllers/PsychologistScheduleController.php:77
* @route '/psychologist/schedules/{schedule}'
*/
updateForm.patch = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\PsychologistScheduleController::destroy
* @see app/Http/Controllers/PsychologistScheduleController.php:97
* @route '/psychologist/schedules/{schedule}'
*/
export const destroy = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/psychologist/schedules/{schedule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PsychologistScheduleController::destroy
* @see app/Http/Controllers/PsychologistScheduleController.php:97
* @route '/psychologist/schedules/{schedule}'
*/
destroy.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { schedule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            schedule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        schedule: typeof args.schedule === 'object'
        ? args.schedule.id
        : args.schedule,
    }

    return destroy.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistScheduleController::destroy
* @see app/Http/Controllers/PsychologistScheduleController.php:97
* @route '/psychologist/schedules/{schedule}'
*/
destroy.delete = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::destroy
* @see app/Http/Controllers/PsychologistScheduleController.php:97
* @route '/psychologist/schedules/{schedule}'
*/
const destroyForm = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PsychologistScheduleController::destroy
* @see app/Http/Controllers/PsychologistScheduleController.php:97
* @route '/psychologist/schedules/{schedule}'
*/
destroyForm.delete = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const schedules = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default schedules