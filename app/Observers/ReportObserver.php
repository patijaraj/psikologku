<?php

namespace App\Observers;

use App\Models\Report;
use App\Notifications\ReportReplyNotification;
use App\Notifications\ReportStatusUpdatedNotification;

class ReportObserver
{
    /**
     * Handle the Report "created" event.
     */
    public function created(Report $report): void
    {
        //
    }

    /**
     * Handle the Report "updated" event.
     */
    public function updated(Report $report): void
    {
        if ($report->wasChanged('status')) {
            $report->user->notify(new ReportStatusUpdatedNotification($report));
        }

        if ($report->wasChanged('admin_reply') && $report->admin_reply !== null) {
            $report->user->notify(new ReportReplyNotification($report));
        }
    }

    /**
     * Handle the Report "deleted" event.
     */
    public function deleted(Report $report): void
    {
        //
    }

    /**
     * Handle the Report "restored" event.
     */
    public function restored(Report $report): void
    {
        //
    }

    /**
     * Handle the Report "force deleted" event.
     */
    public function forceDeleted(Report $report): void
    {
        //
    }
}
