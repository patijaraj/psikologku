import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SessionController::index
* @see app/Http/Controllers/SessionController.php:16
* @route '/sessions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sessions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SessionController::index
* @see app/Http/Controllers/SessionController.php:16
* @route '/sessions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SessionController::index
* @see app/Http/Controllers/SessionController.php:16
* @route '/sessions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SessionController::index
* @see app/Http/Controllers/SessionController.php:16
* @route '/sessions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SessionController::index
* @see app/Http/Controllers/SessionController.php:16
* @route '/sessions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SessionController::index
* @see app/Http/Controllers/SessionController.php:16
* @route '/sessions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SessionController::index
* @see app/Http/Controllers/SessionController.php:16
* @route '/sessions'
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

const SessionController = { index }

export default SessionController