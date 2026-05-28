import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:45
* @route '/midtrans-callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

callback.definition = {
    methods: ["post"],
    url: '/midtrans-callback',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:45
* @route '/midtrans-callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:45
* @route '/midtrans-callback'
*/
callback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:45
* @route '/midtrans-callback'
*/
const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: callback.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:45
* @route '/midtrans-callback'
*/
callbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: callback.url(options),
    method: 'post',
})

callback.form = callbackForm

const midtrans = {
    callback: Object.assign(callback, callback),
}

export default midtrans