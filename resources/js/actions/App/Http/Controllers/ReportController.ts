import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::create
* @see app/Http/Controllers/ReportController.php:13
* @route '/customer-service'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/customer-service',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::create
* @see app/Http/Controllers/ReportController.php:13
* @route '/customer-service'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::create
* @see app/Http/Controllers/ReportController.php:13
* @route '/customer-service'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::create
* @see app/Http/Controllers/ReportController.php:13
* @route '/customer-service'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReportController::create
* @see app/Http/Controllers/ReportController.php:13
* @route '/customer-service'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::create
* @see app/Http/Controllers/ReportController.php:13
* @route '/customer-service'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::create
* @see app/Http/Controllers/ReportController.php:13
* @route '/customer-service'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\ReportController::store
* @see app/Http/Controllers/ReportController.php:18
* @route '/customer-service'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customer-service',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReportController::store
* @see app/Http/Controllers/ReportController.php:18
* @route '/customer-service'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::store
* @see app/Http/Controllers/ReportController.php:18
* @route '/customer-service'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReportController::store
* @see app/Http/Controllers/ReportController.php:18
* @route '/customer-service'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReportController::store
* @see app/Http/Controllers/ReportController.php:18
* @route '/customer-service'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const ReportController = { create, store }

export default ReportController