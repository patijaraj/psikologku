import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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

const payment = {
    resume: Object.assign(resume, resume),
}

export default payment