package com.demo;

import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@CrossOrigin(origins = "*")
public class ApiController {

    private final long startTime = System.currentTimeMillis();

    // ── In-memory store ───────────────────────────────────────────────────────
    private final List<Map<String, Object>> employees = new ArrayList<>(List.of(
        Map.of("id", 1, "name", "Alice Johnson", "dept", "Engineering", "salary", 95000),
        Map.of("id", 2, "name", "Bob Smith", "dept", "Marketing", "salary", 72000),
        Map.of("id", 3, "name", "Carol White", "dept", "Engineering", "salary", 88000)
    ));
    private final AtomicInteger nextId = new AtomicInteger(4);

    // ── Routes ────────────────────────────────────────────────────────────────

    @GetMapping("/")
    public Map<String, Object> index() {
        return Map.of(
            "service", "java-springboot-demo",
            "version", "1.0.0",
            "status", "running",
            "runtime", "Java " + System.getProperty("java.version") + " / Spring Boot 3",
            "timestamp", Instant.now().toString(),
            "endpoints", List.of(
                "GET  /",
                "GET  /health",
                "GET  /api/employees",
                "POST /api/employees",
                "GET  /api/employees/{id}"
            )
        );
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        long uptime = (System.currentTimeMillis() - startTime) / 1000;
        return Map.of("status", "ok", "uptime_seconds", uptime);
    }

    @GetMapping("/api/employees")
    public Map<String, Object> getEmployees(@RequestParam(required = false) String dept) {
        List<Map<String, Object>> result = dept == null ? employees
            : employees.stream().filter(e -> dept.equals(e.get("dept"))).toList();
        return Map.of("employees", result, "total", result.size());
    }

    @GetMapping("/api/employees/{id}")
    public Map<String, Object> getEmployee(@PathVariable int id) {
        return employees.stream()
            .filter(e -> id == (int) e.get("id"))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
    }

    @PostMapping("/api/employees")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public Map<String, Object> createEmployee(@RequestBody Map<String, Object> body) {
        if (!body.containsKey("name") || !body.containsKey("dept")) {
            throw new IllegalArgumentException("name and dept are required");
        }
        Map<String, Object> emp = new HashMap<>(body);
        emp.put("id", nextId.getAndIncrement());
        employees.add(emp);
        return emp;
    }
}
