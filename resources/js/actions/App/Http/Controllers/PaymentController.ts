import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:61
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
* @see app/Http/Controllers/PaymentController.php:61
* @route '/midtrans-callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:61
* @route '/midtrans-callback'
*/
callback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:61
* @route '/midtrans-callback'
*/
const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: callback.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::callback
* @see app/Http/Controllers/PaymentController.php:61
* @route '/midtrans-callback'
*/
callbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: callback.url(options),
    method: 'post',
})

callback.form = callbackForm

/**
* @see \App\Http\Controllers\PaymentController::show
* @see app/Http/Controllers/PaymentController.php:22
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
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::show
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::show
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentController::show
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::show
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::show
* @see app/Http/Controllers/PaymentController.php:22
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

/**
* @see \App\Http\Controllers\PaymentController::resume
* @see app/Http/Controllers/PaymentController.php:46
* @route '/payment/{transaction}/resume'
*/
export const resume = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resume.url(args, options),
    method: 'get',
})

resume.definition = {
    methods: ["get","head"],
    url: '/payment/{transaction}/resume',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::resume
* @see app/Http/Controllers/PaymentController.php:46
* @route '/payment/{transaction}/resume'
*/
resume.url = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { transaction: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            transaction: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        transaction: typeof args.transaction === 'object'
        ? args.transaction.id
        : args.transaction,
    }

    return resume.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::resume
* @see app/Http/Controllers/PaymentController.php:46
* @route '/payment/{transaction}/resume'
*/
resume.get = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resume.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::resume
* @see app/Http/Controllers/PaymentController.php:46
* @route '/payment/{transaction}/resume'
*/
resume.head = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resume.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentController::resume
* @see app/Http/Controllers/PaymentController.php:46
* @route '/payment/{transaction}/resume'
*/
const resumeForm = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resume.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::resume
* @see app/Http/Controllers/PaymentController.php:46
* @route '/payment/{transaction}/resume'
*/
resumeForm.get = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resume.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::resume
* @see app/Http/Controllers/PaymentController.php:46
* @route '/payment/{transaction}/resume'
*/
resumeForm.head = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resume.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

resume.form = resumeForm

const PaymentController = { callback, show, resume }

export default PaymentController