* 基准回归完整版示例
* 适用于 Stata 17/18

version 18.0
clear all
set more off

* ==============================
* 1. 用户需要先修改的部分
* ==============================

* 请修改为你的数据文件所在目录
global project_dir "D:\your-project"

* 请修改为你的数据文件名
global data_file "sample-data.dta"

* 请确认以下变量名与真实数据一致
global y_var "y"
global x_var "x"
global control_vars "size lev roa"
global firm_id_var "firm_id"
global year_var "year"
global industry_var "industry_code"
global region_var "region_code"

* 如需聚类标准误，请填写聚类维度变量
global cluster_var "firm_id"

* ==============================
* 2. 结果输出目录
* ==============================

capture mkdir "${project_dir}\output"
capture mkdir "${project_dir}\output\log"

log using "${project_dir}\output\log\baseline_regression.log", replace text

* ==============================
* 3. 读取数据与基础检查
* ==============================

use "${project_dir}\${data_file}", clear

describe $y_var $x_var $control_vars $firm_id_var $year_var $industry_var $region_var
summarize $y_var $x_var $control_vars

* 检查关键变量缺失值
misstable summarize $y_var $x_var $control_vars $firm_id_var $year_var

* 如果只保留回归样本，可取消下一行注释
* keep if !missing($y_var, $x_var, $control_vars, $firm_id_var, $year_var)

* ==============================
* 4. 描述统计与相关性分析
* ==============================

summarize $y_var $x_var $control_vars, detail
pwcorr $y_var $x_var $control_vars, sig star(0.1)

* ==============================
* 5. 基准回归
* ==============================

* 模型 1：不加固定效应
reg $y_var $x_var $control_vars, vce(robust)
estimates store m1

* 模型 2：加入年份固定效应
reg $y_var $x_var $control_vars i.$year_var, vce(robust)
estimates store m2

* 模型 3：加入个体固定效应与年份固定效应
reg $y_var $x_var $control_vars i.$firm_id_var i.$year_var, vce(cluster $cluster_var)
estimates store m3

* 模型 4：加入行业、地区、年份和个体固定效应
reg $y_var $x_var $control_vars ///
    i.$firm_id_var i.$year_var i.$industry_var i.$region_var, ///
    vce(cluster $cluster_var)
estimates store m4

* 输出回归结果摘要
estimates table m1 m2 m3 m4, b(%9.4f) se(%9.4f) stats(N r2, fmt(%9.0f %9.4f))

* ==============================
* 6. 异质性或稳健性分析占位
* ==============================

* 示例：按地区分组回归
* levelsof $region_var, local(region_list)
* foreach r of local region_list {
*     reg $y_var $x_var $control_vars i.$year_var if $region_var == `r', vce(robust)
* }

* 示例：替换被解释变量后重新回归
* global y_var_alt "y_alt"
* reg $y_var_alt $x_var $control_vars i.$firm_id_var i.$year_var, vce(cluster $cluster_var)

* ==============================
* 7. 导出结果占位
* ==============================

* 如你已安装 esttab / outreg2，可取消注释使用
* esttab m1 m2 m3 m4 using "${project_dir}\output\baseline_regression.rtf", replace se star(* 0.10 ** 0.05 *** 0.01)
* outreg2 [m1 m2 m3 m4] using "${project_dir}\output\baseline_regression.doc", replace ctitle(M1, M2, M3, M4)

* 内置导出方式示例：保存回归样本
gen regression_sample = e(sample) if e(sample) < .
save "${project_dir}\output\baseline_regression_sample.dta", replace

log close
