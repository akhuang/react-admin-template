import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

const HomePage: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>用户统计</CardTitle>
        <CardDescription>查看用户相关的统计数据</CardDescription>
      </CardHeader>
      <CardContent>
        <p>总用户数: 1,234</p>
        <p>活跃用户: 789</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>系统状态</CardTitle>
        <CardDescription>查看系统运行状态</CardDescription>
      </CardHeader>
      <CardContent>
        <p>CPU 使用率: 45%</p>
        <p>内存使用率: 60%</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>最近活动</CardTitle>
        <CardDescription>查看最近的系统活动</CardDescription>
      </CardHeader>
      <CardContent>
        <p>用户登录: 5分钟前</p>
        <p>数据备份: 1小时前</p>
      </CardContent>
    </Card>
  </div>
)

export default HomePage;