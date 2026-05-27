import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Transactions\Pages\EditTransaction::__invoke
* @see app/Filament/Resources/Transactions/Pages/EditTransaction.php:7
* @route '/admin/transactions/{record}/edit'
*/
const EditTransaction = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditTransaction.url(args, options),
    method: 'get',
})

EditTransaction.definition = {
    methods: ["get","head"],
    url: '/admin/transactions/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Transactions\Pages\EditTransaction::__invoke
* @see app/Filament/Resources/Transactions/Pages/EditTransaction.php:7
* @route '/admin/transactions/{record}/edit'
*/
EditTransaction.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    if (Array.isArray(args)) {
        args = {
            record: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        record: args.record,
    }

    return EditTransaction.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Transactions\Pages\EditTransaction::__invoke
* @see app/Filament/Resources/Transactions/Pages/EditTransaction.php:7
* @route '/admin/transactions/{record}/edit'
*/
EditTransaction.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditTransaction.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Transactions\Pages\EditTransaction::__invoke
* @see app/Filament/Resources/Transactions/Pages/EditTransaction.php:7
* @route '/admin/transactions/{record}/edit'
*/
EditTransaction.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditTransaction.url(args, options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Transactions\Pages\EditTransaction::__invoke
* @see app/Filament/Resources/Transactions/Pages/EditTransaction.php:7
* @route '/admin/transactions/{record}/edit'
*/
const EditTransactionForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditTransaction.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Transactions\Pages\EditTransaction::__invoke
* @see app/Filament/Resources/Transactions/Pages/EditTransaction.php:7
* @route '/admin/transactions/{record}/edit'
*/
EditTransactionForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditTransaction.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Transactions\Pages\EditTransaction::__invoke
* @see app/Filament/Resources/Transactions/Pages/EditTransaction.php:7
* @route '/admin/transactions/{record}/edit'
*/
EditTransactionForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditTransaction.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

EditTransaction.form = EditTransactionForm

export default EditTransaction