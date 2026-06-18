<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\DashboardService;
use App\Services\InventoryService;
use App\Services\OrderService;

class ServiceLayerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Mendaftarkan Service ke dalam Service Container sebagai Singleton
        $this->app->singleton(DashboardService::class, function ($app) {
            return new DashboardService($app->make(\App\Contracts\DashboardContract::class));
        });

        $this->app->singleton(InventoryService::class, function ($app) {
            return new InventoryService($app->make(\App\Contracts\InventoryContract::class));
        });

        $this->app->singleton(OrderService::class, function ($app) {
            return new OrderService($app->make(\App\Contracts\OrderContract::class));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
