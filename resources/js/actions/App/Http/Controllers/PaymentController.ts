import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::callback
 * @see app/Http/Controllers/PaymentController.php:43
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
 * @see app/Http/Controllers/PaymentController.php:43
 * @route '/midtrans-callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::callback
 * @see app/Http/Controllers/PaymentController.php:43
 * @route '/midtrans-callback'
 */
callback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::callback
 * @see app/Http/Controllers/PaymentController.php:43
 * @route '/midtrans-callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: callback.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::callback
 * @see app/Http/Controllers/PaymentController.php:43
 * @route '/midtrans-callback'
 */
        callbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: callback.url(options),
            method: 'post',
        })
    
    callback.form = callbackForm
/**
* @see \App\Http\Controllers\PaymentController::show
 * @see app/Http/Controllers/PaymentController.php:19
 * @route '/payment'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::show
 * @see app/Http/Controllers/PaymentController.php:19
 * @route '/payment'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::show
 * @see app/Http/Controllers/PaymentController.php:19
 * @route '/payment'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::show
 * @see app/Http/Controllers/PaymentController.php:19
 * @route '/payment'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::show
 * @see app/Http/Controllers/PaymentController.php:19
 * @route '/payment'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::show
 * @see app/Http/Controllers/PaymentController.php:19
 * @route '/payment'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::show
 * @see app/Http/Controllers/PaymentController.php:19
 * @route '/payment'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const PaymentController = { callback, show }

export default PaymentController