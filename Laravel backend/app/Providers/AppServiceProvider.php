<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Proses memetakan (binding) Contract Interface ke Implementasi Repository-nya
        $this->app->bind(\App\Contracts\OrderContract::class, \App\Repositories\OrderRepository::class);
        $this->app->bind(\App\Contracts\InventoryContract::class, \App\Repositories\InventoryRepository::class);
        $this->app->bind(\App\Contracts\DashboardContract::class, \App\Repositories\DashboardRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}