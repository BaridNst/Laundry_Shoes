<?php

namespace App\Services;

use App\Contracts\DashboardContract;

class DashboardService
{
    protected $dashboardRepository;

    /**
     * Dependency Injection via Constructor (Service Container)
     */
    public function __construct(DashboardContract $dashboardRepository)
    {
        $this->dashboardRepository = $dashboardRepository;
    }

    public function getActiveOrdersCount()
    {
        return $this->dashboardRepository->getActiveOrdersCount();
    }

    public function getCompletedTodayCount()
    {
        return $this->dashboardRepository->getCompletedTodayCount();
    }

    public function getLowStockCount()
    {
        return $this->dashboardRepository->getLowStockCount();
    }

    public function getLaporanKeuangan()
    {
        return $this->dashboardRepository->getLaporanKeuangan();
    }
}
