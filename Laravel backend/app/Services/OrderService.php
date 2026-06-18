<?php

namespace App\Services;

use App\Contracts\OrderContract;

class OrderService
{
    protected $orderRepository;

    /**
     * Dependency Injection via Constructor (Service Container)
     */
    public function __construct(OrderContract $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function getLatestOrders(int $limit = 10)
    {
        return $this->orderRepository->getLatestOrders($limit);
    }

    public function createOrder(array $data)
    {
        return $this->orderRepository->createOrder($data);
    }

    public function updateCucianStatus(int $orderId, string $status)
    {
        return $this->orderRepository->updateCucianStatus($orderId, $status);
    }

    public function updatePaymentStatus(int $orderId, string $status)
    {
        return $this->orderRepository->updatePaymentStatus($orderId, $status);
    }
}
