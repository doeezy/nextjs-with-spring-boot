package com.mobigen.backend.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocketVO {
    private String connId; // 커넥트 아이디
    private String msg; // 메시지
    private String connTime; // 커넥트 타임
}
