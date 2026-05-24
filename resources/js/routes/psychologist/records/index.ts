import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PsychologistRecordController::index
* @see app/Http/Controllers/PsychologistRecordController.php:12
* @route '/psychologist/records'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/psychologist/records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsychologistRecordController::index
* @see app/Http/Controllers/PsychologistRecordController.php:12
* @route '/psychologist/records'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistRecordController::index
* @see app/Http/Controllers/PsychologistRecordController.php:12
* @route '/psychologist/records'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistRecordController::index
* @see app/Http/Controllers/PsychologistRecordController.php:12
* @route '/psychologist/records'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PsychologistRecordController::index
* @see app/Http/Controllers/PsychologistRecordController.php:12
* @route '/psychologist/records'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistRecordController::index
* @see app/Http/Controllers/PsychologistRecordController.php:12
* @route '/psychologist/records'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistRecordController::index
* @see app/Http/Controllers/PsychologistRecordController.php:12
* @route '/psychologist/records'
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

const records = {
    index: Object.assign(index, index),
}

export default records